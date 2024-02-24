import { GitHubService } from './gh/gh_service';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') dotenv.config();

const owner = process.env.OWNER ?? '';
const repo = process.env.REPO ?? '';
const prNumber = parseInt(process.env.PR ?? '');

const ghService = new GitHubService(owner, repo);
const repos = ghService.pullRequests.fetchPRs(2);
for (let repo of repos) {
  console.log(repo.title);
  const commits = ghService.pullRequests.fetchCommits(repo.number);
}
