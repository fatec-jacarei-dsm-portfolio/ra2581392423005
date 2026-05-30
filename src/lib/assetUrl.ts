export function resolveAssetUrl(path?: string, fallback = "") {
	if (!path) return fallback;

	if (
		path.startsWith("http://") ||
		path.startsWith("https://") ||
		path.startsWith("data:") ||
		path.startsWith("blob:")
	) {
		return path;
	}

	if (path.startsWith("/")) {
		return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
	}

	return path;
}

export function getGithubOpenGraphImage(githubUrl?: string) {
	if (!githubUrl) return "";

	const match = githubUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/);

	if (!match) return "";

	const owner = match[1];
	const repo = match[2];

	return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
}

export function getOctacodeOpenGraphImage(repoName: string) {
	return `https://opengraph.githubassets.com/1/octacodeteam/${repoName}`;
}
