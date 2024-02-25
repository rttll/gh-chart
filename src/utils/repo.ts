import { Executor } from './shell';
import { Commit } from '../types';

import { PullRequest } from '../types';

const getCurrentRepo = (): { repo: string } | null => {
  const repo = Executor.executeCommand('gh repo view --json name,owner').trim();
  if (repo) return JSON.parse(repo);
  return null;
};

const _findStartAndEndDate = (commits: Commit[]): [Date, Date] => {
  const timestamps = commits.map((commit) =>
    new Date(commit.authoredDate).getTime()
  );
  return [new Date(Math.min(...timestamps)), new Date(Math.max(...timestamps))];
};

const _calculateDuration = (startDate: Date, endDate: Date): string => {
  const weeks = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  return `${weeks} weeks`;
};

const timeData = (pullRequest: PullRequest) => {
  const [startDate, endDate] = _findStartAndEndDate(pullRequest.commits);
  const timeSpan = _calculateDuration(startDate, endDate);
  return {
    startDate,
    endDate,
    timeSpan,
  };
};

export { getCurrentRepo, timeData };
