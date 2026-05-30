import { Github, Linkedin, Settings } from "lucide-react";
import { useState } from "react";
import { AbpProjects } from "./components/AbpProjects";
import { AdminLogin, AdminPanel } from "./components/AdminPanel";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { SkillsAndHobbies } from "./components/SkillsAndHobbies";
import { useAdmin } from "./hooks/useAdmin";

function Footer({ onAdminClick }: { onAdminClick: () => void }) {
	return (
		<footer className="border-t border-white/10 px-6 py-8">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/35 md:flex-row">
				<p>
					© {new Date().getFullYear()} Gustavo Hammes · Todos os direitos
					reservados.
				</p>

				<div className="flex items-center gap-3">
					<a
						href="https://github.com/GustavoHammes"
						target="_blank"
						rel="noreferrer"
						className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/45 transition hover:text-white"
						aria-label="GitHub"
					>
						<Github className="h-4 w-4" />
					</a>

					<a
						href="https://linkedin.com/in/gustavohammes"
						target="_blank"
						rel="noreferrer"
						className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/45 transition hover:text-white"
						aria-label="LinkedIn"
					>
						<Linkedin className="h-4 w-4" />
					</a>

					<button
						type="button"
						onClick={onAdminClick}
						className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/20 transition hover:text-white/50"
						aria-label="Admin"
					>
						<Settings className="h-4 w-4" />
					</button>
				</div>
			</div>
		</footer>
	);
}

export default function App() {
	const {
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
	} = useAdmin();

	const [showAdminPanel, setShowAdminPanel] = useState(false);

	function handleAdminClick() {
		if (isAdmin) {
			setShowAdminPanel(true);
		} else {
			setShowLoginModal(true);
		}
	}

	return (
		<div className="min-h-screen bg-[#070d1a] text-white">
			{loading && (
				<div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#070d1a]">
					<div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm text-white/60">
						Carregando...
					</div>
				</div>
			)}

			{isAdmin && (
				<button
					type="button"
					onClick={() => setShowAdminPanel(true)}
					className="fixed bottom-5 right-5 z-40 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-300 shadow-lg backdrop-blur transition hover:bg-green-500/20"
				>
					Modo Admin · Clique para editar
					{saveStatus === "saving" && " ⏳"}
					{saveStatus === "saved" && " ✓"}
					{saveStatus === "error" && " ✗"}
				</button>
			)}

			{showLoginModal && (
				<AdminLogin onLogin={login} onClose={() => setShowLoginModal(false)} />
			)}

			{isAdmin && showAdminPanel && (
				<AdminPanel
					projects={projects}
					certificates={certificates}
					saveStatus={saveStatus}
					onAddProject={addProject}
					onRemoveProject={removeProject}
					onUpdateProject={updateProject}
					onAddCertificate={addCertificate}
					onRemoveCertificate={removeCertificate}
					onUpdateCertificate={updateCertificate}
					onReset={resetToDefaults}
					onClose={() => {
						setShowAdminPanel(false);
						logout();
					}}
				/>
			)}

			<Navbar isAdmin={isAdmin} onAdminClick={handleAdminClick} />

			<main>
				<Hero />

				<Projects
					projects={projects}
					isAdmin={isAdmin}
					onRemove={removeProject}
				/>

				<AbpProjects
					abpConfig={abpConfig}
					isAdmin={isAdmin}
					onAddAbpProject={addAbpProject}
					onRemoveAbpProject={removeAbpProject}
					onUpdateAbpProject={updateAbpProject}
				/>

				<Certificates
					certificates={certificates}
					isAdmin={isAdmin}
					onRemove={removeCertificate}
				/>

				<SkillsAndHobbies />

				<Contact />
			</main>

			<Footer onAdminClick={handleAdminClick} />
		</div>
	);
}
