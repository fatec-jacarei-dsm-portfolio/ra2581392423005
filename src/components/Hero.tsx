import { FileText, Github, Linkedin, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const ROLES = [
	"Desenvolvedor Full Stack",
	"React & TypeScript",
	"Node.js & Python",
	"Estudante de DSM",
];

export function Hero() {
	const [roleIndex, setRoleIndex] = useState(0);
	const [displayed, setDisplayed] = useState("");
	const [deleting, setDeleting] = useState(false);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), 100);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const current = ROLES[roleIndex];
		let timeout: ReturnType<typeof setTimeout>;

		if (!deleting && displayed.length < current.length) {
			timeout = setTimeout(
				() => setDisplayed(current.slice(0, displayed.length + 1)),
				60,
			);
		} else if (!deleting && displayed.length === current.length) {
			timeout = setTimeout(() => setDeleting(true), 2200);
		} else if (deleting && displayed.length > 0) {
			timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
		} else if (deleting && displayed.length === 0) {
			setDeleting(false);
			setRoleIndex((index) => (index + 1) % ROLES.length);
		}

		return () => clearTimeout(timeout);
	}, [displayed, deleting, roleIndex]);

	const profileImage = `${import.meta.env.BASE_URL}assets/images/profile.jpg`;
	const fallbackImage =
		"https://ui-avatars.com/api/?name=Gustavo+Hammes&size=144&background=4f46e5&color=fff&bold=true";

	return (
		<section
			id="sobre"
			className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
		>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_36%)]" />

			<div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

			<div
				className={`relative z-10 mx-auto max-w-4xl text-center transition-all duration-700 ${
					visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
				}`}
			>
				<div className="mx-auto mb-8 h-36 w-36 rounded-full border-4 border-indigo-500/40 bg-white/5 p-1 shadow-2xl shadow-indigo-500/30">
					<div className="relative h-full w-full overflow-hidden rounded-full">
						<img
							src={profileImage}
							alt="Gustavo Hammes"
							className="h-full w-full object-cover"
							onError={(event) => {
								event.currentTarget.src = fallbackImage;
							}}
						/>
					</div>

					<span className="absolute ml-10 mt-[-26px] block h-4 w-4 rounded-full border-2 border-[#0a1020] bg-green-400" />
				</div>

				<h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
					Gustavo{" "}
					<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
						Hammes
					</span>
				</h1>

				<div className="mt-6 h-8 text-xl font-semibold text-white/65">
					{displayed}
					<span className="ml-1 animate-pulse text-indigo-400">|</span>
				</div>

				<p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/55">
					Estudante de Desenvolvimento de Software Multiplataforma, com foco em
					React, TypeScript, Node.js, SQL, Python, automação e desenvolvimento
					de soluções web, mobile e geoespaciais.
				</p>

				<div className="mt-10 flex flex-wrap justify-center gap-4">
					<a
						href="#conhecimentos"
						className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
					>
						<FileText className="h-4 w-4" />
						Ver Conhecimentos
					</a>

					<a
						href="#contato"
						className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white/70 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
					>
						<MessageCircle className="h-4 w-4" />
						Entrar em Contato
					</a>
				</div>

				<div className="mt-8 flex justify-center gap-4">
					<a
						href="https://github.com/GustavoHammes"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition hover:border-white/20 hover:text-white"
					>
						<Github className="h-4 w-4" />
						GitHub
					</a>

					<a
						href="https://linkedin.com/in/gustavohammes"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition hover:border-white/20 hover:text-white"
					>
						<Linkedin className="h-4 w-4" />
						LinkedIn
					</a>
				</div>
			</div>
		</section>
	);
}
