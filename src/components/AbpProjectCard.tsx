import { motion } from "framer-motion";
import { ExternalLink, Eye, EyeOff, ImageIcon, Star } from "lucide-react";
import type { AbpConfig, AbpProject } from "../hooks/useAbpProjects";
import { getOctacodeOpenGraphImage, resolveAssetUrl } from "../lib/assetUrl";

const LANG_COLORS: Record<string, string> = {
	TypeScript: "#3178c6",
	JavaScript: "#f1e05a",
	Python: "#3572A5",
	Java: "#b07219",
	"C#": "#178600",
	HTML: "#e34c26",
	CSS: "#563d7c",
	PHP: "#4F5D95",
	Go: "#00ADD8",
	Rust: "#dea584",
};

function formatRepoName(name: string) {
	return name
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

interface AbpProjectCardProps {
	project: AbpProject;
	index: number;
}

export function AbpProjectCard({ project, index }: AbpProjectCardProps) {
	const langColor = project.language
		? (LANG_COLORS[project.language] ?? "#8b8b8b")
		: "#8b8b8b";

	const fallbackImage = getOctacodeOpenGraphImage(project.name);
	const imageSrc = resolveAssetUrl(project.image, fallbackImage);

	return (
		<motion.article
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: index * 0.08 }}
			className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/[0.05]"
		>
			<a
				href={project.html_url}
				target="_blank"
				rel="noreferrer"
				className="block"
			>
				<div className="h-44 overflow-hidden bg-white/5">
					<img
						src={imageSrc}
						alt={formatRepoName(project.name)}
						className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
						onError={(event) => {
							event.currentTarget.src = fallbackImage;
						}}
					/>
				</div>

				<div className="space-y-4 p-5">
					<div className="flex items-start justify-between gap-4">
						<h3 className="text-lg font-bold text-white">
							{formatRepoName(project.name)}
						</h3>

						<ExternalLink className="h-4 w-4 flex-shrink-0 text-white/35 transition group-hover:text-indigo-300" />
					</div>

					{project.description && (
						<p className="line-clamp-3 text-sm leading-6 text-white/50">
							{project.description}
						</p>
					)}

					<div className="flex items-center justify-between border-t border-white/10 pt-4">
						<div className="flex items-center gap-2">
							{project.language && (
								<>
									<span
										className="h-2.5 w-2.5 rounded-full"
										style={{ backgroundColor: langColor }}
									/>

									<span className="text-xs text-white/45">
										{project.language}
									</span>
								</>
							)}
						</div>

						{project.stargazers_count > 0 && (
							<span className="flex items-center gap-1 text-xs text-white/35">
								<Star className="h-3.5 w-3.5" />
								{project.stargazers_count}
							</span>
						)}
					</div>
				</div>
			</a>
		</motion.article>
	);
}

interface AbpAdminCardProps {
	config: AbpConfig;
	onToggleVisible: () => void;
	onChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
	uploading: boolean;
}

export function AbpAdminCard({
	config,
	onToggleVisible,
	onChangeImage,
	uploading,
}: AbpAdminCardProps) {
	const fallbackImage = getOctacodeOpenGraphImage(config.name);
	const imageSrc = resolveAssetUrl(config.image, fallbackImage);

	return (
		<div className="relative flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
			<div className="h-12 w-16 overflow-hidden rounded-lg border border-white/10 bg-white/5">
				{config.image ? (
					<img
						src={imageSrc}
						alt=""
						className="h-full w-full object-cover"
						onError={(event) => {
							event.currentTarget.src = fallbackImage;
						}}
					/>
				) : (
					<img
						src={fallbackImage}
						alt=""
						className="h-full w-full object-cover opacity-80"
					/>
				)}
			</div>

			<div className="min-w-0 flex-1">
				<p className="truncate text-sm font-medium text-white">
					{formatRepoName(config.name)}
				</p>

				<p className="text-xs text-white/35">{config.name}</p>
			</div>

			<div className="flex flex-shrink-0 items-center gap-2">
				<label className="cursor-pointer rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/45 transition hover:text-white">
					<input
						type="file"
						accept="image/jpeg,image/png,image/webp,image/gif"
						onChange={onChangeImage}
						className="hidden"
					/>

					<span className="flex items-center gap-1.5">
						<ImageIcon className="h-3.5 w-3.5" />
						{uploading ? "Enviando..." : "Imagem"}
					</span>
				</label>

				<button
					type="button"
					onClick={onToggleVisible}
					className={`rounded-lg px-3 py-1.5 text-xs transition ${
						config.visible
							? "bg-green-500/10 text-green-300 hover:bg-green-500/20"
							: "bg-white/5 text-white/35 hover:bg-white/10"
					}`}
				>
					<span className="flex items-center gap-1.5">
						{config.visible ? (
							<Eye className="h-3.5 w-3.5" />
						) : (
							<EyeOff className="h-3.5 w-3.5" />
						)}

						{config.visible ? "Visível" : "Oculto"}
					</span>
				</button>
			</div>
		</div>
	);
}
