import { Executor } from '../utils/shell';

export class PullRequestService {
  constructor(
    private owner: string,
    private repo: string
  ) {}

  fetchCommits(prNumber: number): any {
    const command = `gh pr view ${prNumber} --repo ${this.owner}/${this.repo} --json commits`;
    const output = Executor.executeCommand(command);
    try {
      return JSON.parse(output);
    } catch (error) {
      console.error('Failed to parse JSON output:', error);
      return null;
    }
  }

  fetchPRs(limit: number = 10, status: 'open' | 'closed' = 'open'): any {
    const command = `gh pr list --repo ${this.owner}/${this.repo} --limit ${limit} --state ${status} --json number,title,state`;
    const output = Executor.executeCommand(command);

    try {
      return JSON.parse(output);
    } catch (error) {
      console.error('Failed to parse JSON output:', error);
      return null;
    }
  }
}
