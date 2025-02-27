export interface PullRequest {
  open: number;
  closed: number;
  merged: number;
  totalCount: number;
  data: PullRequestData[];
}

interface PullRequestData {
  id: string;
  title: string;
  url: string;
  state: "MERGED" | "CLOSED" | "OPEN";
  mergedBy?: {
    avatarUrl: string;
    url: string;
    login: string;
  };
  createdAt: string;
  number: number;
  changedFiles: number;
  additions: number;
  deletions: number;
  baseRepository: {
    name: string;
    url: string;
    owner: {
      avatarUrl: string;
      login: string;
      url: string;
    };
  };
}