export interface Issue {
  open: number;
  closed: number;
  totalCount: number;
  data: issueData[];
}

interface issueData {
  id: string;
  closed: boolean;
  title: string;
  createdAt: string;
  url: string;
  number: number;
  assignees?: {
    nodes: {
      avatarUrl: string;
      name: string;
      url: string;
    }[];
  };
  repository: {
    name: string;
    url: string;
    owner: {
      login: string;
      avatarUrl: string;
      url: string;
    };
  };
}