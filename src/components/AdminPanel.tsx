import { useState } from "react";
import type { Certificate, Project, ProjectCategory } from "../data/projects";
import type { SaveStatus } from "../hooks/useAdmin";
import { FileUpload } from "./FileUpload";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "gh2024admin";

interface AdminLoginProps {
	onLogin: (password: string) => boolean;
	onClose: () => void;
}

export function AdminLogin({ onLogin, onClose }: AdminLoginProps) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (!onLogin(password)) {
			setError("Senha incorreta.");
		}
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0a1628] p-6 shadow-2xl"
			>
				<h2 className="text-xl font-bold text-white">Modo Admin</h2>

				<p className="mt-2 text-sm text-white/45">
					Digite a senha para continuar.
				</p>

				<input
					type="password"
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
						setError("");
					}}
					placeholder="Senha"
					autoFocus
					className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-indigo-500"
				/>

				{error && <p className="mt-3 text-sm text-red-400">{error}</p>}

				<div className="mt-5 flex gap-3">
					<button
						type="button"
						onClick={onClose}
						className="flex-1 rounded-lg border border-white/10 px-4 py-2.5 text-sm text-white/55 transition hover:text-white"
					>
						Cancelar
					</button>

					<button
						type="submit"
						className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
					>
						Entrar
					</button>
				</div>

				<p className="mt-4 text-center text-xs text-white/25">
					Atalho: Ctrl + Shift + A
				</p>
			</form>
		</div>
	);
}

const CATEGORIES: ProjectCategory[] = [
	"Acadêmico",
	"Pessoal",
	"Profissional",
	"Outro",
];

const EMPTY_PROJECT: Omit<Project, "id"> = {
	title: "",
	description: "",
	image: "",
	tags: [],
	category: "Pessoal",
	liveUrl: "",
	githubUrl: "",
	featured: false,
};

const EMPTY_CERTIFICATE: Omit<Certificate, "id"> = {
	title: "",
	issuer: "",
	year: "",
	url: "",
	pdfPath: "",
};

function categoryClass(category: ProjectCategory) {
	if (category === "Acadêmico") {
		return "bg-blue-500/10 border-blue-500/20 text-blue-300";
	}

	if (category === "Pessoal") {
		return "bg-green-500/10 border-green-500/20 text-green-300";
	}

	if (category === "Profissional") {
		return "bg-amber-500/10 border-amber-500/20 text-amber-300";
	}

	return "bg-white/5 border-white/10 text-white/40";
}

function ProjectForm({
	initial,
	title,
	onSave,
	onCancel,
}: {
	initial?: Project;
	title: string;
	onSave: (data: Omit<Project, "id">) => void;
	onCancel: () => void;
}) {
	const [form, setForm] = useState<Omit<Project, "id">>(
		initial ? { ...initial } : { ...EMPTY_PROJECT },
	);

	const [tagsInput, setTagsInput] = useState(initial?.tags.join(", ") ?? "");

	function set(patch: Partial<Omit<Project, "id">>) {
		setForm((current) => ({ ...current, ...patch }));
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		onSave({
			...form,
			tags: tagsInput
				.split(",")
				.map((tag: string) => tag.trim())
				.filter(Boolean),
		});
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 rounded-xl border border-white/[0.07] bg-white/5 p-4"
		>
			<p className="text-sm font-medium text-white/70">{title}</p>

			<FileUpload
				accept="image"
				folder="projects"
				label="Imagem do projeto"
				value={form.image}
				onChange={(value) => set({ image: value })}
				adminPassword={ADMIN_PASSWORD}
			/>

			<input
				required
				value={form.title}
				onChange={(event) => set({ title: event.target.value })}
				placeholder="Título *"
				className="admin-input w-full"
			/>

			<textarea
				required
				value={form.description}
				onChange={(event) => set({ description: event.target.value })}
				placeholder="Descrição *"
				rows={3}
				className="admin-input w-full resize-none"
			/>

			<input
				value={tagsInput}
				onChange={(event) => setTagsInput(event.target.value)}
				placeholder="Tags: React, TypeScript, Node.js"
				className="admin-input w-full"
			/>

			<div className="grid grid-cols-2 gap-3">
				<div>
					<label className="mb-1 block text-xs text-white/40">Categoria</label>

					<select
						value={form.category}
						onChange={(event) =>
							set({ category: event.target.value as ProjectCategory })
						}
						className="admin-input w-full"
					>
						{CATEGORIES.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<label className="flex cursor-pointer items-center gap-2 pt-5 text-sm text-white/60">
					<input
						type="checkbox"
						checked={Boolean(form.featured)}
						onChange={(event) => set({ featured: event.target.checked })}
						className="h-4 w-4 accent-indigo-500"
					/>
					⭐ Destaque
				</label>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<input
					value={form.liveUrl ?? ""}
					onChange={(event) => set({ liveUrl: event.target.value })}
					placeholder="Link ao vivo"
					className="admin-input"
				/>

				<input
					value={form.githubUrl ?? ""}
					onChange={(event) => set({ githubUrl: event.target.value })}
					placeholder="GitHub"
					className="admin-input"
				/>
			</div>

			<div className="flex gap-2 pt-1">
				<button
					type="button"
					onClick={onCancel}
					className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm text-white/40 transition hover:text-white"
				>
					Cancelar
				</button>

				<button
					type="submit"
					className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
				>
					Salvar projeto
				</button>
			</div>
		</form>
	);
}

function CertificateForm({
	initial,
	title,
	onSave,
	onCancel,
}: {
	initial?: Certificate;
	title: string;
	onSave: (data: Omit<Certificate, "id">) => void;
	onCancel: () => void;
}) {
	const [form, setForm] = useState<Omit<Certificate, "id">>(
		initial ? { ...initial } : { ...EMPTY_CERTIFICATE },
	);

	function set(patch: Partial<Omit<Certificate, "id">>) {
		setForm((current) => ({ ...current, ...patch }));
	}

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		onSave(form);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 rounded-xl border border-white/[0.07] bg-white/5 p-4"
		>
			<p className="text-sm font-medium text-white/70">{title}</p>

			<input
				required
				value={form.title}
				onChange={(event) => set({ title: event.target.value })}
				placeholder="Título do certificado *"
				className="admin-input w-full"
			/>

			<div className="grid grid-cols-2 gap-3">
				<input
					required
					value={form.issuer}
					onChange={(event) => set({ issuer: event.target.value })}
					placeholder="Emissor *"
					className="admin-input"
				/>

				<input
					value={form.year ?? ""}
					onChange={(event) => set({ year: event.target.value })}
					placeholder="Ano"
					className="admin-input"
				/>
			</div>

			<FileUpload
				accept="pdf"
				folder="certificates"
				label="PDF do certificado"
				value={form.pdfPath ?? ""}
				onChange={(value) => set({ pdfPath: value })}
				adminPassword={ADMIN_PASSWORD}
			/>

			<input
				value={form.url ?? ""}
				onChange={(event) => set({ url: event.target.value })}
				placeholder="Link externo"
				className="admin-input w-full"
			/>

			<div className="flex gap-2">
				<button
					type="button"
					onClick={onCancel}
					className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm text-white/40 transition hover:text-white"
				>
					Cancelar
				</button>

				<button
					type="submit"
					className="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
				>
					Salvar certificado
				</button>
			</div>
		</form>
	);
}

interface AdminPanelProps {
	projects: Project[];
	certificates: Certificate[];
	saveStatus: SaveStatus;
	onAddProject: (project: Omit<Project, "id">) => void;
	onRemoveProject: (id: string) => void;
	onUpdateProject: (id: string, data: Partial<Omit<Project, "id">>) => void;
	onAddCertificate: (certificate: Omit<Certificate, "id">) => void;
	onRemoveCertificate: (id: string) => void;
	onUpdateCertificate: (
		id: string,
		data: Partial<Omit<Certificate, "id">>,
	) => void;
	onReset: () => void;
	onClose: () => void;
}

type FormMode =
	| { type: "add-project" }
	| { type: "edit-project"; project: Project }
	| { type: "add-certificate" }
	| { type: "edit-certificate"; certificate: Certificate }
	| null;

const STATUS_CONFIG: Record<SaveStatus, { text: string; className: string }> = {
	idle: {
		text: "",
		className: "",
	},
	saving: {
		text: "⏳ Salvando...",
		className: "text-amber-400",
	},
	saved: {
		text: "✓ Alterado nesta sessão",
		className: "text-green-400",
	},
	error: {
		text: "✗ Erro ao salvar",
		className: "text-red-400",
	},
};

export function AdminPanel({
	projects,
	certificates,
	saveStatus,
	onAddProject,
	onRemoveProject,
	onUpdateProject,
	onAddCertificate,
	onRemoveCertificate,
	onUpdateCertificate,
	onReset,
	onClose,
}: AdminPanelProps) {
	const [tab, setTab] = useState<"projects" | "certificates">("projects");
	const [formMode, setFormMode] = useState<FormMode>(null);
	const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

	const status = STATUS_CONFIG[saveStatus];

	function askDelete(id: string) {
		if (confirmDelete === id) {
			if (tab === "projects") {
				onRemoveProject(id);
			} else {
				onRemoveCertificate(id);
			}

			setConfirmDelete(null);
			return;
		}

		setConfirmDelete(id);

		setTimeout(() => {
			setConfirmDelete(null);
		}, 3000);
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			<div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl">
				<div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
					<div className="flex items-center gap-3">
						<span className="h-2 w-2 rounded-full bg-green-400" />

						<span className="text-sm font-semibold text-white">
							Painel Admin
						</span>

						{status.text && (
							<span className={`text-xs ${status.className}`}>
								{status.text}
							</span>
						)}
					</div>

					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={onReset}
							className="px-2 py-1 text-xs text-white/25 transition hover:text-red-400"
						>
							Resetar dados
						</button>

						<button
							type="button"
							onClick={onClose}
							className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
						>
							Fechar
						</button>
					</div>
				</div>

				<div className="flex gap-1 px-6 pt-3">
					<button
						type="button"
						onClick={() => {
							setTab("projects");
							setFormMode(null);
						}}
						className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
							tab === "projects"
								? "bg-indigo-600 text-white"
								: "text-white/40 hover:bg-white/5 hover:text-white"
						}`}
					>
						Projetos ({projects.length})
					</button>

					<button
						type="button"
						onClick={() => {
							setTab("certificates");
							setFormMode(null);
						}}
						className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
							tab === "certificates"
								? "bg-indigo-600 text-white"
								: "text-white/40 hover:bg-white/5 hover:text-white"
						}`}
					>
						Certificados ({certificates.length})
					</button>
				</div>

				<div className="flex-1 space-y-2 overflow-y-auto px-6 py-4">
					{tab === "projects" && (
						<>
							{projects.map((project) => (
								<div key={project.id}>
									{formMode?.type === "edit-project" &&
									formMode.project.id === project.id ? (
										<ProjectForm
											title="Editar projeto"
											initial={project}
											onSave={(data) => {
												onUpdateProject(project.id, data);
												setFormMode(null);
											}}
											onCancel={() => setFormMode(null)}
										/>
									) : (
										<div className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.05]">
											{project.image && (
												<img
													src={project.image}
													alt=""
													className="h-10 w-12 flex-shrink-0 rounded-lg object-cover opacity-75"
												/>
											)}

											<div className="min-w-0 flex-1">
												<div className="flex flex-wrap items-center gap-2">
													<span className="truncate text-sm font-medium text-white">
														{project.title}
													</span>

													<span
														className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-xs ${categoryClass(
															project.category,
														)}`}
													>
														{project.category}
													</span>

													{project.featured && (
														<span className="flex-shrink-0 text-xs text-amber-300">
															⭐
														</span>
													)}
												</div>

												<p className="mt-0.5 truncate text-xs text-white/30">
													{project.tags.join(", ")}
												</p>
											</div>

											<div className="flex flex-shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
												<button
													type="button"
													onClick={() =>
														setFormMode({
															type: "edit-project",
															project,
														})
													}
													className="rounded-lg bg-indigo-500/10 px-2.5 py-1.5 text-xs text-indigo-300 transition hover:bg-indigo-500/20"
												>
													Editar
												</button>

												<button
													type="button"
													onClick={() => askDelete(project.id)}
													className={`rounded-lg px-2.5 py-1.5 text-xs transition ${
														confirmDelete === project.id
															? "bg-red-500 text-white"
															: "bg-red-500/10 text-red-400 hover:bg-red-500/20"
													}`}
												>
													{confirmDelete === project.id
														? "Confirmar?"
														: "Remover"}
												</button>
											</div>
										</div>
									)}
								</div>
							))}

							{formMode?.type === "add-project" ? (
								<ProjectForm
									title="Novo projeto"
									onSave={(data) => {
										onAddProject(data);
										setFormMode(null);
									}}
									onCancel={() => setFormMode(null)}
								/>
							) : (
								formMode === null && (
									<button
										type="button"
										onClick={() => setFormMode({ type: "add-project" })}
										className="mt-1 w-full rounded-xl border border-dashed border-white/15 py-3 text-sm text-white/35 transition hover:border-indigo-500 hover:text-white"
									>
										+ Adicionar projeto
									</button>
								)
							)}
						</>
					)}

					{tab === "certificates" && (
						<>
							{certificates.map((certificate) => (
								<div key={certificate.id}>
									{formMode?.type === "edit-certificate" &&
									formMode.certificate.id === certificate.id ? (
										<CertificateForm
											title="Editar certificado"
											initial={certificate}
											onSave={(data) => {
												onUpdateCertificate(certificate.id, data);
												setFormMode(null);
											}}
											onCancel={() => setFormMode(null)}
										/>
									) : (
										<div className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.05]">
											<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/5 text-base">
												{certificate.pdfPath ? "📄" : "🏅"}
											</div>

											<div className="min-w-0 flex-1">
												<div className="flex flex-wrap items-center gap-2">
													<span className="text-sm font-medium text-white">
														{certificate.title}
													</span>

													<span className="text-xs text-white/35">
														— {certificate.issuer}
													</span>

													{certificate.year && (
														<span className="text-xs text-white/25">
															({certificate.year})
														</span>
													)}
												</div>

												<div className="mt-0.5 flex items-center gap-2">
													{certificate.pdfPath && (
														<span className="text-xs text-green-400">
															✓ PDF
														</span>
													)}

													{certificate.url && (
														<span className="text-xs text-indigo-400">
															✓ Link
														</span>
													)}

													{!certificate.pdfPath && !certificate.url && (
														<span className="text-xs text-white/20">
															sem anexo
														</span>
													)}
												</div>
											</div>

											<div className="flex flex-shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
												<button
													type="button"
													onClick={() =>
														setFormMode({
															type: "edit-certificate",
															certificate,
														})
													}
													className="rounded-lg bg-indigo-500/10 px-2.5 py-1.5 text-xs text-indigo-300 transition hover:bg-indigo-500/20"
												>
													Editar
												</button>

												<button
													type="button"
													onClick={() => askDelete(certificate.id)}
													className={`rounded-lg px-2.5 py-1.5 text-xs transition ${
														confirmDelete === certificate.id
															? "bg-red-500 text-white"
															: "bg-red-500/10 text-red-400 hover:bg-red-500/20"
													}`}
												>
													{confirmDelete === certificate.id
														? "Confirmar?"
														: "Remover"}
												</button>
											</div>
										</div>
									)}
								</div>
							))}

							{formMode?.type === "add-certificate" ? (
								<CertificateForm
									title="Novo certificado"
									onSave={(data) => {
										onAddCertificate(data);
										setFormMode(null);
									}}
									onCancel={() => setFormMode(null)}
								/>
							) : (
								formMode === null && (
									<button
										type="button"
										onClick={() => setFormMode({ type: "add-certificate" })}
										className="mt-1 w-full rounded-xl border border-dashed border-white/15 py-3 text-sm text-white/35 transition hover:border-indigo-500 hover:text-white"
									>
										+ Adicionar certificado
									</button>
								)
							)}
						</>
					)}
				</div>

				<div className="border-t border-white/[0.06] px-6 py-3">
					<p className="text-center text-xs text-white/20">
						No GitHub Pages, alterações pelo admin ficam apenas na sessão atual.
						Para salvar oficialmente, edite o data.json e gere novo build.
					</p>
				</div>
			</div>
		</div>
	);
}
