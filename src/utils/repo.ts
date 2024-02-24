import { Executor } from './shell';

export const getCurrentRepo = (): { owner: string; repo: string } | null => {
  const repo = Executor.executeCommand('gh repo view --json name,owner').trim();
  if (repo) {
    const { name, owner: repoOwner } = JSON.parse(repo);
    return { owner: repoOwner.login, repo: name };
  }
  return null;
};
