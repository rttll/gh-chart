import { writeFileSync } from 'fs';
import { GitHubService } from '../gh/gh_service';
import { timeData } from '../utils/repo';
import { Chart, registerables } from 'chart.js';
import { PullRequest } from '../types';

Chart.register(...registerables);

const getPRData = (repo: string, limit: number) => {
  const ghService = new GitHubService(repo);
  return ghService.pullRequests
    .fetchPRs(limit, 'closed')
    .map((pr: PullRequest) => ({
      ...pr,
      ...timeData(pr),
    }));
};

function prepareChartData(pullRequests: PullRequest[]) {
  const projectStartDates = pullRequests.map((pullRequest) =>
    new Date(pullRequest.startDate).getTime()
  );
  const earliestStartDate = new Date(Math.min(...projectStartDates));

  return pullRequests.map((pullRequest) => {
    const startDate = new Date(pullRequest.startDate);
    const endDate = new Date(pullRequest.endDate);
    const startOffset = Math.ceil(
      (startDate.getTime() - earliestStartDate.getTime()) /
        (1000 * 60 * 60 * 24 * 7)
    );
    const duration = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    return {
      label: pullRequest.title,
      startOffset,
      duration,
      timeSpan: pullRequest.timeSpan,
    };
  });
}

const build = (repo: string, limit: number) => {
  const data = getPRData(repo, limit);

  const chartData = prepareChartData(data);
  const jsonData = JSON.stringify(chartData, null, 2);
  writeFileSync('chartData.json', jsonData);
};

export { build };
