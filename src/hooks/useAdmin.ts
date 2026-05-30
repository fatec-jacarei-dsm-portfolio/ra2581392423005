import { useCallback, useEffect, useState } from "react";
import type { Certificate, Project } from "../data/projects";
import { DEFAULT_CERTIFICATES, DEFAULT_PROJECTS } from "../data/projects";
import type { AbpConfig } from "./useAbpProjects";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "gh2024admin";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

function isGithubPages() {
	return window.location.hostname.includes("github.io");
}

export function useAdmin() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);

	const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
	const [certificates, setCertificates] =
		useState<Certificate[]>(DEFAULT_CERTIFICATES);
	const [abpConfig, setAbpConfig] = useState<AbpConfig[]>([]);

	const [loading, setLoading] = useState(true);
	const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

	useEffect(() => {
		fetch(`${import.meta.env.BASE_URL}data.json`)
			.then((response) => response.json())
			.then(
				(data: {
					projects?: Project[];
					certificates?: Certificate[];
					abpConfig?: AbpConfig[];
				}) => {
					if (data.projects) setProjects(data.projects);
					if (data.certificates) setCertificates(data.certificates);
					if (data.abpConfig) setAbpConfig(data.abpConfig);
				},
			)
			.catch(() => {
				console.warn(
					"Não foi possível carregar o data.json. Usando dados padrão.",
				);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
				event.preventDefault();

				if (isAdmin) {
					setIsAdmin(false);
				} else {
					setShowLoginModal(true);
				}
			}
		};

		window.addEventListener("keydown", handler);

		return () => {
			window.removeEventListener("keydown", handler);
		};
	}, [isAdmin]);

	const login = useCallback((password: string): boolean => {
		if (password === ADMIN_PASSWORD) {
			setIsAdmin(true);
			setShowLoginModal(false);
			sessionStorage.setItem("adminPassword", password);
			return true;
		}

		return false;
	}, []);

	const logout = useCallback(() => {
		setIsAdmin(false);
		sessionStorage.removeItem("adminPassword");
	}, []);

	const persist = useCallback(
		async (
			updatedProjects: Project[],
			updatedCertificates: Certificate[],
			updatedAbpConfig: AbpConfig[],
		) => {
			if (isGithubPages()) {
				setSaveStatus("saved");
				console.info(
					"GitHub Pages detectado: alteração feita apenas na sessão atual. Para salvar oficialmente, atualize public/data.json e gere novo build.",
				);

				setTimeout(() => {
					setSaveStatus("idle");
				}, 3000);

				return;
			}

			setSaveStatus("saving");

			try {
				const response = await fetch("/api/saveData", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						password: ADMIN_PASSWORD,
						data: {
							projects: updatedProjects,
							certificates: updatedCertificates,
							abpConfig: updatedAbpConfig,
						},
					}),
				});

				if (!response.ok) {
					const error = await response.json();
					throw new Error(error.error || "Erro desconhecido");
				}

				setSaveStatus("saved");

				setTimeout(() => {
					setSaveStatus("idle");
				}, 3000);
			} catch (error) {
				console.error("Erro ao salvar:", error);
				setSaveStatus("error");

				setTimeout(() => {
					setSaveStatus("idle");
				}, 4000);
			}
		},
		[],
	);

	const addProject = useCallback(
		(project: Omit<Project, "id">) => {
			const newProject: Project = {
				...project,
				id: Date.now().toString(),
			};

			const updatedProjects = [...projects, newProject];

			setProjects(updatedProjects);
			void persist(updatedProjects, certificates, abpConfig);
		},
		[projects, certificates, abpConfig, persist],
	);

	const removeProject = useCallback(
		(id: string) => {
			const updatedProjects = projects.filter((project) => project.id !== id);

			setProjects(updatedProjects);
			void persist(updatedProjects, certificates, abpConfig);
		},
		[projects, certificates, abpConfig, persist],
	);

	const updateProject = useCallback(
		(id: string, data: Partial<Omit<Project, "id">>) => {
			const updatedProjects = projects.map((project) =>
				project.id === id ? { ...project, ...data } : project,
			);

			setProjects(updatedProjects);
			void persist(updatedProjects, certificates, abpConfig);
		},
		[projects, certificates, abpConfig, persist],
	);

	const addCertificate = useCallback(
		(certificate: Omit<Certificate, "id">) => {
			const newCertificate: Certificate = {
				...certificate,
				id: Date.now().toString(),
			};

			const updatedCertificates = [...certificates, newCertificate];

			setCertificates(updatedCertificates);
			void persist(projects, updatedCertificates, abpConfig);
		},
		[projects, certificates, abpConfig, persist],
	);

	const removeCertificate = useCallback(
		(id: string) => {
			const updatedCertificates = certificates.filter(
				(certificate) => certificate.id !== id,
			);

			setCertificates(updatedCertificates);
			void persist(projects, updatedCertificates, abpConfig);
		},
		[projects, certificates, abpConfig, persist],
	);

	const updateCertificate = useCallback(
		(id: string, data: Partial<Omit<Certificate, "id">>) => {
			const updatedCertificates = certificates.map((certificate) =>
				certificate.id === id ? { ...certificate, ...data } : certificate,
			);

			setCertificates(updatedCertificates);
			void persist(projects, updatedCertificates, abpConfig);
		},
		[projects, certificates, abpConfig, persist],
	);

	const resetToDefaults = useCallback(() => {
		setProjects(DEFAULT_PROJECTS);
		setCertificates(DEFAULT_CERTIFICATES);

		void persist(DEFAULT_PROJECTS, DEFAULT_CERTIFICATES, abpConfig);
	}, [abpConfig, persist]);

	const addAbpProject = useCallback(
		(name: string) => {
			setAbpConfig((current) => {
				if (current.some((config) => config.name === name)) return current;

				const updatedConfig: AbpConfig[] = [
					...current,
					{
						name,
						image: "",
						visible: true,
					},
				];

				void persist(projects, certificates, updatedConfig);

				return updatedConfig;
			});
		},
		[projects, certificates, persist],
	);

	const removeAbpProject = useCallback(
		(name: string) => {
			setAbpConfig((current) => {
				const updatedConfig = current.filter((config) => config.name !== name);

				void persist(projects, certificates, updatedConfig);

				return updatedConfig;
			});
		},
		[projects, certificates, persist],
	);

	const updateAbpProject = useCallback(
		(name: string, updates: Partial<AbpConfig>) => {
			setAbpConfig((current) => {
				const updatedConfig = current.map((config) =>
					config.name === name ? { ...config, ...updates } : config,
				);

				void persist(projects, certificates, updatedConfig);

				return updatedConfig;
			});
		},
		[projects, certificates, persist],
	);

	return {
		isAdmin,
		showLoginModal,
		setShowLoginModal,
		login,
		logout,
		projects,
		certificates,
		abpConfig,
		loading,
		saveStatus,
		addProject,
		removeProject,
		updateProject,
		addCertificate,
		removeCertificate,
		updateCertificate,
		addAbpProject,
		removeAbpProject,
		updateAbpProject,
		resetToDefaults,
	};
}
