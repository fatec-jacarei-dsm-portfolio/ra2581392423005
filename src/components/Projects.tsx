import { useState } from "react";
import type { Project, ProjectCategory } from "../data/projects";

interface ProjectsProps {
	projects: Project[];
	isAdmin: boolean;
	onRemove?: (id: string) => void;
}

const CATEGORIES: (ProjectCategory | "Todos")[] = [
	"Todos",
	"Acadêmico",
	"Pessoal",
	"Profissional",
	"Outro",
];

function resolveImageUrl(image: string, fallback: string) {
	if (!image) return fallback;

	if (
		image.startsWith("http://") ||
		image.startsWith("https://") ||
		image.startsWith("data:") ||
		image.startsWith("blob:")
	) {
		return image;
	}

	if (image.startsWith("/")) {
		return `${import.meta.env.BASE_URL}${image.replace(/^\/+/, "")}`;
	}

	return image;
}

function getGithubOpenGraphImage(githubUrl?: string) {
	if (!githubUrl) return "";

	const match = githubUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/);

	if (!match) return "";

	const owner = match[1];
	const repo = match[2];

	return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

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

function ProjectCard({
	project,
	isAdmin,
	onRemove,
}: {
	project: Project;
	isAdmin: boolean;
	onRemove?: () => void;
}) {
	const [hovered, setHovered] = useState(false);

	const githubFallback =
		getGithubOpenGraphImage(project.githubUrl) ||
		`https://picsum.photos/seed/${project.id}/600/340`;

	const imageSrc = resolveImageUrl(project.image, githubFallback);

	return (
		<article
			className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/[0.05]"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{isAdmin && onRemove && (
				<button
					type="button"
					onClick={onRemove}
					className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/80 text-white opacity-0 transition hover:bg-red-500 group-hover:opacity-100"
					aria-label="Remover projeto"
				>
					×
				</button>
			)}

			{project.featured && (
				<div className="absolute left-3 top-3 z-20 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
					⭐ Destaque
				</div>
			)}

			<div className="relative h-48 overflow-hidden">
				<img
					src={imageSrc}
					alt={project.title}
					className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
					onError={(event) => {
						event.currentTarget.src = githubFallback;
					}}
				/>

				<div
					className={`absolute inset-0 flex items-center justify-center gap-3 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
						hovered ? "opacity-100" : "opacity-0"
					}`}
				>
					{project.liveUrl && (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noreferrer"
							onClick={(event) => event.stopPropagation()}
							className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
						>
							Ver projeto
						</a>
					)}

					{project.githubUrl && (
						<a
							href={project.githubUrl}
							target="_blank"
							rel="noreferrer"
							onClick={(event) => event.stopPropagation()}
							className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
						>
							GitHub
						</a>
					)}

					{!project.liveUrl && !project.githubUrl && (
						<span className="text-sm text-white/60">Em breve</span>
					)}
				</div>
			</div>

			<div className="space-y-4 p-5">
				<div className="flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60"
						>
							{tag}
						</span>
					))}
				</div>

				<div>
					<h3 className="text-xl font-bold text-white">{project.title}</h3>

					<p className="mt-2 line-clamp-4 text-sm leading-6 text-white/55">
						{project.description}
					</p>
				</div>

				<div className="flex items-center justify-between border-t border-white/10 pt-4">
					<span
						className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryClass(
							project.category,
						)}`}
					>
						{project.category}
					</span>

					{(project.liveUrl || project.githubUrl) && (
						<a
							href={project.liveUrl || project.githubUrl}
							target="_blank"
							rel="noreferrer"
							className="text-sm text-indigo-300 transition hover:text-indigo-200"
						>
							Ver projeto
						</a>
					)}
				</div>
			</div>
		</article>
	);
}

export function Projects({ projects, isAdmin, onRemove }: ProjectsProps) {
	const [filter, setFilter] = useState<ProjectCategory | "Todos">("Todos");

	const filtered =
		filter === "Todos"
			? projects
			: projects.filter((project) => project.category === filter);

	return (
		<section id="projetos" className="px-6 py-24">
			<div className="mx-auto max-w-6xl">
				<p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-indigo-300/80">
					Portfólio
				</p>

				<h2 className="text-3xl font-bold text-white md:text-4xl">
					Meus Projetos
				</h2>

				<p className="mt-4 max-w-2xl text-white/55">
					Uma seleção dos projetos que desenvolvi durante minha jornada
					acadêmica, pessoal e profissional.
				</p>

				<div className="mt-8 flex flex-wrap gap-3">
					{CATEGORIES.map((category) => (
						<button
							key={category}
							type="button"
							onClick={() => setFilter(category)}
							className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
								filter === category
									? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
									: "border border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white"
							}`}
						>
							{category}

							{category !== "Todos" && (
								<span className="ml-2 text-xs opacity-70">
									{
										projects.filter((project) => project.category === category)
											.length
									}
								</span>
							)}
						</button>
					))}
				</div>

				{filtered.length === 0 ? (
					<div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
						<p className="text-white/50">
							Nenhum projeto nessa categoria ainda.
						</p>

						{isAdmin && (
							<p className="mt-2 text-sm text-white/30">
								Use o painel admin para adicionar projetos.
							</p>
						)}
					</div>
				) : (
					<div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{filtered.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								isAdmin={isAdmin}
								onRemove={onRemove ? () => onRemove(project.id) : undefined}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
