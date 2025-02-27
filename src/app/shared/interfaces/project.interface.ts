export interface Project {
    id: string;
    name: string;
    createdAt: string;
    url: string;
    description?: string;
    isFork: boolean;
    languages?: {
      nodes: {
        name: string;
      }[];
    };
    [key: string]: any; // Allow for additional properties
}