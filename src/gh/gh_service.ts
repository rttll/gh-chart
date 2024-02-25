import { PullRequestService } from './pr_service';
import { getCurrentRepo } from '../utils/repo';

export class GitHubService {
  private prService: PullRequestService;

  private repo!: string;

  constructor(repo: string = '') {
    this.setRepo(repo);
    this.prService = new PullRequestService(this.repo);
  }

  setRepo(repo: string) {
    if (repo) {
      this.repo = repo;
      return;
    }
    const currentRepo = getCurrentRepo();
    if (currentRepo) {
      this.repo = currentRepo.repo;
      return;
    }
    throw new Error('Could not get repo.');
  }

  get pullRequests() {
    return this.prService;
  }
}
