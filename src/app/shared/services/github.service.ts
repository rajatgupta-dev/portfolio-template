import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Organization, Project } from '../../shared/interfaces';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  languages_icons: { [key: string]: string } = {
    Python: "logos-python",
    "Jupyter Notebook": "logos-jupyter",
    HTML: "logos-html-5",
    CSS: "logos-css-3",
    JavaScript: "logos-javascript",
    "C#": "logos-c-sharp",
    Java: "logos-java",
    Shell: "simple-icons:shell",
    Ruby: "logos:ruby",
    PHP: "logos-php",
    Dockerfile: "simple-icons:docker",
    Rust: "logos-rust",
  };

  baseUrl = 'https://api.github.com/graphql';
  headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${environment.git_key}`,
  };
  username = environment.git_username;

  constructor(private http: HttpClient) {}

  fetchPullRequests() {
    const query_pr = `
      query {
        user(login: "${this.username}") {
          pullRequests(last: 100, orderBy: {field: CREATED_AT, direction: DESC}){
            totalCount
            nodes{
              id
              title
              url
              state
              mergedBy {
                avatarUrl
                url
                login
              }
              createdAt
              number
              changedFiles
              additions
              deletions
              baseRepository {
                name
                url
                owner {
                  avatarUrl
                  login
                  url
                }
              }
            }
          }
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { query: query_pr }, { headers: this.headers }).pipe(
      map((data) => this.processData(data.data.user.pullRequests)), 
      catchError(this.handleError));
  }
  
  fetchIssues() {
    const query_issue = `
      query{
        user(login: "${this.username}") {
          issues(last: 100, orderBy: {field:CREATED_AT, direction: DESC}){
            totalCount
            nodes{
              id
              closed
              title
              createdAt
              url
              number
              assignees(first:100){
                nodes{
                  avatarUrl
                  name
                  url
                }
              }
              repository{
                name
                url
                owner{
                  login
                  avatarUrl
                  url
                }
              }
            }
          }
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { query: query_issue }, { headers: this.headers }).pipe(
      map((data) => this.processData(data.data.user.issues)), 
      catchError(this.handleError));
  }
  
  fetchContributedOrgs() {
    const query_org = `
      query{
        user(login: "${this.username}") {
          repositoriesContributedTo(last: 100){
            totalCount
            nodes{
              owner{
                login
                avatarUrl
                __typename
              }
            }
          }
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { query: query_org }, { headers: this.headers }).pipe(
      map((data) => this.processData(data.data.user.repositoriesContributedTo)), 
      catchError(this.handleError));
  }

  fetchPinnedProjects() {
    const query_pinned_projects = `
      query { 
        user(login: "${this.username}") { 
          pinnedItems(first: 6, types: REPOSITORY) {
            totalCount
            nodes{
              ... on Repository{
                id
                name
                createdAt,
                url,
                description,
                isFork,
                languages(first:10){
                  nodes{
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { query: query_pinned_projects }, { headers: this.headers }).pipe(
      map((data) => this.processData(data.data.user.pinnedItems)), 
      catchError(this.handleError));

  }

  private handleError(error: any): Observable<never> {
    console.error('Error fetching data:', error);
    return throwError(() => new Error('Failed to fetch data'));
  }


  private processData(data: any): any {
    // Implement data processing logic for each API call
    // This method needs to be adjusted based on the structure of the API response
    // For example:
    if (data.nodes) { 
      if (data.nodes[0]?.state) { // Check for pull request specific properties
        const processedData: any[] = data.nodes;
        const open = processedData.filter((pr: any) => pr.state === 'OPEN').length;
        const closed = processedData.filter((pr: any) => pr.state === 'CLOSED').length;
        const merged = processedData.filter((pr: any) => pr.state === 'MERGED').length;
        return { 
          data: processedData, 
          open, 
          closed, 
          merged, 
          totalCount: data.totalCount 
        };
      } else if (data.nodes[0]?.closed) { // Check for issue specific properties
        const processedData: any[] = data.nodes;
        const open = processedData.filter((issue: any) => !issue.closed).length;
        const closed = processedData.filter((issue: any) => issue.closed).length;
        return { 
          data: processedData, 
          open, 
          closed, 
          totalCount: data.totalCount 
        };
      } else if (data.nodes[0]?.owner) { // Check for organizations
        const uniqueOrgs = new Set();
        const processedData: Organization[] = data.nodes.filter((org: any) => {
          if (org.owner.__typename === 'Organization') {
            if (!uniqueOrgs.has(org.owner.login)) {
              uniqueOrgs.add(org.owner.login);
              return true;
            }
          }
          return false;
        });
        return processedData;
      } else if (data.nodes[0]?.name) { // Check for pinned projects
        const processedData: Project[] = data.nodes.map((project: any) => ({
          ...project, 
          languages: project.languages?.nodes.map((lang: any) => ({
            name: lang.name,
            iconifyClass: this.languages_icons[lang.name] || '' 
          })) 
        }));
        return processedData;
      }
    }
    return data; 
  }
}