import { PullRequestService } from './pr_service';
import { getCurrentRepo } from '../utils/repo';

export class GitHubService {
  private prService: PullRequestService;
  private owner!: string;
  private repo!: string;

  constructor(owner: string = '', repo: string = '') {
    this.setRepo(owner, repo);
    this.prService = new PullRequestService(this.owner, this.repo);
  }

  setRepo(owner: string, repo: string) {
    if (owner && repo) {
      this.owner = owner;
      this.repo = repo;
      return;
    }
    const currentRepo = getCurrentRepo();
    if (currentRepo) {
      this.owner = currentRepo.owner;
      this.repo = currentRepo.repo;
      return;
    }
    throw new Error('Could not get repo.');
  }

  get pullRequests() {
    return this.prService;
  }
}
