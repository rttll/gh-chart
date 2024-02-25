import { Executor } from '../utils/shell';
import { PullRequest } from '../types';

export class PullRequestService {
  constructor(private repo: string) {}

  fetchCommits(prNumber: number): any {
    const command = `gh pr view ${prNumber} --repo ${this.repo} --json commits`;
    const output = Executor.executeCommand(command);
    try {
      return JSON.parse(output)['commits'];
    } catch (error) {
      console.error('Failed to parse JSON output:', error);
      return null;
    }
  }

  fetchPRs(limit: number = 10, status: 'open' | 'closed' = 'open'): any {
    const command = `gh pr list --repo ${this.repo} --limit ${limit} --state ${status} --json number,title,state`;

    try {
      const resp = Executor.executeCommand(command);
      const prs = JSON.parse(resp);
      return prs.map((pr: PullRequest) => ({
        ...pr,
        commits: this.fetchCommits(pr.number),
      }));
    } catch (error) {
      console.error('Failed to parse JSON output:', error);
      return null;
    }
  }
}
