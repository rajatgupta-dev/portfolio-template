import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  expertiseData = [
    {
      icon: 'Code2',
      title: 'Frontend Development',
      description: 'React, TypeScript, JavaScript, HTML5, CSS3',
      colorClass: 'text-blue-400',
      svg: "frontend"
    },
    {
      icon: 'Globe',
      title: 'Web Architecture',
      description: 'SSR, CSR, SEO Optimization, Performance',
      colorClass: 'text-purple-400',
      svg: "web"
    },
    {
      icon: 'Database',
      title: 'State Management',
      description: 'Redux, Context API, React Query',
      colorClass: 'text-green-400',
      svg: "state"
    },
    {
      icon: 'Cpu',
      title: 'Tools & Testing',
      description: 'Jest, Cypress, Git, CI/CD',
      colorClass: 'text-red-400',
      svg: "testing"
    },
  ];
}
