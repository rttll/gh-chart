export interface Repo {
  number: number;
  title: string;
}

export interface PullRequest {
  number: number;
  title: string;
  startDate: Date;
  endDate: Date;
  timeSpan: string;
  commits: Commit[];
}

export interface Commit {
  authoredDate: string;
}
