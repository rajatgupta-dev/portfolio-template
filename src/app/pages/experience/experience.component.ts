import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  expData = [
    {
      from: 'start-date',
      to: 'end-date',
      img: 'images/avatar.svg',
      comapny_name: 'Your Company',
      location: "Location",
      position: "Profile",
      no_of_projects: "115"
    },
    {
      from: 'start-date',
      to: 'end-date',
      img: 'images/avatar.svg',
      comapny_name: 'Your Company',
      location: "Location",
      position: "Profile",
      no_of_projects: "1110+"
    },
    {
      from: 'start-date',
      to: 'end-date',
      img: 'images/avatar.svg',
      comapny_name: 'Your Company',
      location: "Location",
      position: "Profile",
      no_of_projects: "4111"
    },
  ]
}
