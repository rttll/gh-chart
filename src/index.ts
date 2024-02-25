#!/usr/bin/env node
import { parseArgv } from './utils/cli';
import { GitHubService } from './gh/gh_service';

interface Repo {
  number: number;
  title: string;
}

const { owner = '', repo = '', limit = 10 } = parseArgv();

const ghService = new GitHubService(owner, repo);
const repos = ghService.pullRequests.fetchPRs(limit);
repos.forEach((repo: Repo) => {
  console.log(`PR #${repo.number}: ${repo.title}`);
});
