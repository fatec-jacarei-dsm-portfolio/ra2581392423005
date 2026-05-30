import { useQuery } from "@tanstack/react-query";

const GITHUB_USER = "octacodeteam";

export interface AbpConfig {
	name: string;
	image: string;
	visible: boolean;
}

export interface GithubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	updated_at: string;
	topics: string[];
}

export interface AbpProject extends GithubRepo {
	image: string;
	visible: boolean;
}

async function fetchRepos(): Promise<GithubRepo[]> {
	const response = await fetch(
		`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
		{
			headers: {
				Accept: "application/vnd.github+json",
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Erro ao buscar repositórios do GitHub: ${response.status}`,
		);
	}

	return response.json();
}

export function useOctacodeRepos() {
	return useQuery({
		queryKey: ["octacode-repos"],
		queryFn: fetchRepos,
		staleTime: 1000 * 60 * 10,
		retry: false,
	});
}

export function useAbpProjects(abpConfig: AbpConfig[]) {
	return useQuery({
		queryKey: ["abp-projects", abpConfig],
		queryFn: async () => {
			const repos = await fetchRepos();
			const visibleConfig = abpConfig.filter((config) => config.visible);

			return visibleConfig
				.map((config) => {
					const repo = repos.find((item) => item.name === config.name);

					if (!repo) return null;

					return {
						...repo,
						image: config.image,
						visible: config.visible,
					};
				})
				.filter(Boolean) as AbpProject[];
		},
		staleTime: 1000 * 60 * 10,
		retry: false,
		enabled: abpConfig.length > 0,
	});
}
