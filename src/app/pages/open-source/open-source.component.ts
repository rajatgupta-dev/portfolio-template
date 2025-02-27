import { Component, ElementRef, Inject, inject, InjectionToken, PLATFORM_ID, ViewChild } from '@angular/core';
import { GitHubService } from '../../shared/services/github.service';
import { Issue, Organization, Project, PullRequest } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-open-source',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-source.component.html',
  styleUrl: './open-source.component.scss'
})
export class OpenSourceComponent {

  pullRequests!: PullRequest;
  issues!: Issue;
  organizations: Organization[] = [];
  projects: Project[] = [];
    
  githubService = inject(GitHubService);

  @ViewChild('pullResuestCanvas') pullResuestCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('issueCanvas') issueCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: InjectionToken<object>){}
    
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return
    }
    this.fetchPullRequests();
    this.fetchIssues();
    this.fetchContributedOrgs();
    // this.fetchPinnedProjects();
  }

  private fetchPullRequests(): void {  
    this.githubService.fetchPullRequests().subscribe((pullRequests: any) => {
      this.pullRequests = pullRequests;

      const canvas = this.pullResuestCanvas.nativeElement;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context)   return;

      new Chart(context, {
        type: 'doughnut',
        data: {
          labels: ['Closed', 'Open', 'Merged'],
          datasets: [
            {
              data: [pullRequests.closed,  pullRequests.open, pullRequests.merged],
              backgroundColor: ['#DC2626', '#16A34A', '#9333EA'],
              hoverBackgroundColor: ['#DC2626', '#16A34A', '#9333EA']
            }
          ]
        },
        options: {
          maintainAspectRatio: false
        }
      });
    });
  }

  private fetchIssues(): void {  
    this.githubService.fetchIssues().subscribe((issues: any) => {
      this.issues = issues;
      const canvas = this.issueCanvas.nativeElement;

      if (!canvas) return;
      
      const context = canvas.getContext('2d');
      if (!context)   return;

      new Chart(context, {
        type: 'doughnut',
        data: {
          labels: ['Closed', 'Open'],
          datasets: [
            {
              data: [issues.closed,  issues.open],
              backgroundColor: ['#DC2626', '#16A34A'],
              hoverBackgroundColor: ['#DC2626', '#16A34A']
            }
          ]
        },
        options: {
          maintainAspectRatio: false
        }
      });
    });
  }

  private fetchContributedOrgs(): void {
    this.githubService.fetchContributedOrgs().subscribe((organizations: any) => {
      this.organizations = organizations;
    });
  }

  private fetchPinnedProjects(): void {
    this.githubService.fetchPinnedProjects().subscribe((projects: any) => {
      this.projects = projects;
    });
  }
}
