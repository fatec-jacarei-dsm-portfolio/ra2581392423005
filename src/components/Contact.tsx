import { ExternalLink, Github, Linkedin } from "lucide-react";

const socialLinks = [
	{
		label: "LinkedIn",
		href: "https://linkedin.com/in/gustavohammes",
		icon: Linkedin,
		description: "Acompanhe minha trajetória profissional e acadêmica.",
	},
	{
		label: "GitHub",
		href: "https://github.com/GustavoHammes",
		icon: Github,
		description:
			"Veja meus repositórios, projetos e estudos em desenvolvimento.",
	},
];

export function Contact() {
	return (
		<section id="contato" className="px-6 py-24">
			<div className="mx-auto max-w-4xl text-center">
				<p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-indigo-300/80">
					Contato
				</p>

				<h2 className="text-3xl font-bold text-white md:text-5xl">
					Vamos nos conectar?
				</h2>

				<p className="mx-auto mt-4 max-w-2xl text-white/55">
					Para contato profissional, networking ou acompanhamento dos meus
					projetos, mantenho disponíveis apenas minhas redes principais.
				</p>

				<div className="mt-12 grid gap-5 md:grid-cols-2">
					{socialLinks.map((link) => {
						const Icon = link.icon;

						return (
							<a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noreferrer"
								className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/[0.05]"
							>
								<div className="flex items-center justify-between gap-4">
									<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
										<Icon className="h-5 w-5" />
									</div>

									<ExternalLink className="h-4 w-4 text-white/30 transition group-hover:text-indigo-300" />
								</div>

								<h3 className="mt-5 text-xl font-bold text-white">
									{link.label}
								</h3>

								<p className="mt-2 text-sm leading-6 text-white/50">
									{link.description}
								</p>
							</a>
						);
					})}
				</div>
			</div>
		</section>
	);
}
