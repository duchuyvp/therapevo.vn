export const GITHUB_REPO_OWNER = "duchuyvp";
export const GITHUB_REPO_NAME = "therapevo.vn";
export const GITHUB_BRANCH = "master";

const GITHUB_API = "https://api.github.com";

export function githubHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "therapevo-admin",
  };
}

export function githubContentsUrl(filePath: string): string {
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  return `${GITHUB_API}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${encodedPath}`;
}

export function decodeBase64UTF8(value: string): string {
  const binary = atob(value.replace(/\s/g, ""));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}
