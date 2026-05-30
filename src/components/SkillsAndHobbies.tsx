import { ExternalLink, FileText } from "lucide-react";

const technicalGroups = [
	{
		title: "Linguagens de Programação",
		items: [
			"Python",
			"TypeScript",
			"JavaScript",
			"C++ / Arduino",
			"HTML5",
			"CSS3",
			"SQL",
		],
	},
	{
		title: "Front-end & Visualização",
		items: [
			"React.js",
			"Vite",
			"Leaflet.js",
			"Chart.js",
			"Consumo de APIs REST",
			"Manipulação de DOM",
			"Responsividade",
		],
	},
	{
		title: "Back-end & Arquitetura",
		items: [
			"Node.js",
			"Express.js",
			"Arquitetura MVC",
			"Mongoose",
			"Integração com APIs externas",
			"APIs STAC e WTSS",
		],
	},
	{
		title: "Dados & Automação",
		items: [
			"OpenCV",
			"Selenium",
			"PyAutoGUI",
			"Pandas",
			"Openpyxl",
			"GeoJSON",
			"GeoTIFF",
		],
	},
	{
		title: "Banco de Dados",
		items: ["MongoDB", "PostgreSQL", "MySQL"],
	},
	{
		title: "Ferramentas & Metodologias",
		items: [
			"Git",
			"GitHub",
			"VS Code",
			"Figma",
			"Postman",
			"Scrum",
			"Kanban",
			"Versionamento de código",
		],
	},
];

const softSkills = [
	"Trabalho em equipe",
	"Boa comunicação",
	"Colaboração",
	"Adaptabilidade",
	"Criatividade",
	"Liderança",
	"Aprendizagem contínua",
	"Flexibilidade",
	"Relacionamento interpessoal",
	"Equilíbrio emocional",
];

const languages = [
	{
		name: "Inglês",
		level: "Avançado",
	},
	{
		name: "Espanhol",
		level: "Intermediário",
	},
	{
		name: "Alemão",
		level: "Iniciante",
	},
];

const academicProjects = [
	{
		title: "Laser Cat Tracker",
		description:
			"Projeto com Python, OpenCV e Arduino para rastreamento automático de gatos com laser baseado em detecção facial.",
	},
	{
		title: "Dashboard Solar Interativo",
		description:
			"Visualização de dados ambientais com React, TypeScript, Leaflet e arquivos GeoTIFF, com filtros por estado, bioma e datas.",
	},
	{
		title: "GeoInsight - INPE",
		description:
			"Aplicação web para análise de dados geoespaciais e séries temporais de satélites utilizando TypeScript, Leaflet, Chart.js e Node.js.",
	},
];

const pdfDocuments = [
	{
		title: "Currículo",
		description: "Abrir meu currículo profissional em PDF.",
		href: `${import.meta.env.BASE_URL}pdfs/curriculo-gustavo-hammes.pdf`,
	},
	{
		title: "Certificados",
		description: "Abrir arquivo com certificados e atividades complementares.",
		href: `${import.meta.env.BASE_URL}pdfs/certificados-gustavo-hammes.pdf`,
	},
];

export function SkillsAndHobbies() {
	return (
		<section id="conhecimentos" className="px-6 py-24">
			<div className="mx-auto max-w-6xl">
				<p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-indigo-300/80">
					Currículo
				</p>

				<h2 className="text-3xl font-bold text-white md:text-4xl">
					Conhecimentos Técnicos & Habilidades
				</h2>

				<p className="mt-4 max-w-3xl text-white/55">
					Além dos certificados, estes são os principais conhecimentos,
					ferramentas e competências que fazem parte da minha formação acadêmica
					e experiência prática.
				</p>

				<div className="mt-10 grid gap-4 md:grid-cols-2">
					{pdfDocuments.map((document) => (
						<a
							key={document.title}
							href={document.href}
							target="_blank"
							rel="noreferrer"
							className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-white/[0.05]"
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
									<FileText className="h-5 w-5" />
								</div>

								<ExternalLink className="h-4 w-4 text-white/30 transition group-hover:text-indigo-300" />
							</div>

							<h3 className="mt-5 text-xl font-bold text-white">
								{document.title}
							</h3>

							<p className="mt-2 text-sm leading-6 text-white/50">
								{document.description}
							</p>
						</a>
					))}
				</div>

				<div className="mt-12 grid gap-6 lg:grid-cols-2">
					{technicalGroups.map((group) => (
						<div
							key={group.title}
							className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-indigo-500/30 hover:bg-white/[0.05]"
						>
							<h3 className="text-lg font-bold text-white">{group.title}</h3>

							<div className="mt-5 flex flex-wrap gap-3">
								{group.items.map((item) => (
									<span
										key={item}
										className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-sm text-indigo-200"
									>
										{item}
									</span>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="mt-8 grid gap-6 lg:grid-cols-3">
					<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
						<h3 className="text-lg font-bold text-white">
							Habilidades Comportamentais
						</h3>

						<div className="mt-5 flex flex-wrap gap-3">
							{softSkills.map((skill) => (
								<span
									key={skill}
									className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/60"
								>
									{skill}
								</span>
							))}
						</div>
					</div>

					<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
						<h3 className="text-lg font-bold text-white">Idiomas</h3>

						<div className="mt-5 space-y-3">
							{languages.map((language) => (
								<div
									key={language.name}
									className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
								>
									<span className="font-medium text-white/80">
										{language.name}
									</span>

									<span className="text-sm text-indigo-300">
										{language.level}
									</span>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
						<h3 className="text-lg font-bold text-white">Formação</h3>

						<div className="mt-5 space-y-4 text-sm leading-6 text-white/60">
							<p>
								<strong className="text-white/85">Fatec Jacareí</strong>
								<br />
								Desenvolvimento de Software Multiplataforma
								<br />
								Previsão de término: Jun/2027
							</p>

							<p>
								<strong className="text-white/85">Colégio ETEP</strong>
								<br />
								Ensino Médio com Técnico em Informática
							</p>
						</div>
					</div>
				</div>

				<div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
					<h3 className="text-lg font-bold text-white">
						Projetos em destaque no currículo
					</h3>

					<div className="mt-5 grid gap-4 md:grid-cols-3">
						{academicProjects.map((project) => (
							<div
								key={project.title}
								className="rounded-xl border border-white/10 bg-white/5 p-4"
							>
								<h4 className="font-semibold text-white">{project.title}</h4>

								<p className="mt-2 text-sm leading-6 text-white/50">
									{project.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
