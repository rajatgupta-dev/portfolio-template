import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  studyData = [
    {
      from: 'start-date',
      to: 'end-date',
      img: 'images/avatar.svg',
      comapny_name: 'Your College',
      sch_from: "College",
      qualification: 'Degree - ',
      name: "College Name",
      percentage:"100%"
    },
    {
      from: 'start-date',
      to: 'end-date',
      img: 'images/avatar.svg',
      comapny_name: 'Your College',
      qualification: 'Degree - ',
      sch_from: "College",
      name: "College Name",
      percentage:"100%"
    },
    {
      from: 'start-date',
      to: 'end-date',
      img: 'images/avatar.svg',
      comapny_name: 'Your College',
      qualification: 'Class - XII<sup>th</sup>',
      sch_from: "School",
      name: "School Name",
      percentage:"100%"
    },
    {
      from: 'start-date',
      to: 'end-date',
      img: 'images/avatar.svg',
      comapny_name: 'Your College',
      qualification: 'Class - X<sup>th</sup>',
      sch_from: "School",
      name: "School Name",
      percentage:"100%"
    },
  ]
}
