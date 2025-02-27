import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
      path: 'home',
      loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
    },
    {
      path: 'education',
      loadComponent: () => import('./pages/education/education.component').then(c => c.EducationComponent)
    },
    {
      path: 'contact-us',
      loadComponent: () => import('./pages/contact-us/contact-us.component').then(c => c.ContactUsComponent)
    },
    {
      path: 'experience',
      loadComponent: () => import('./pages/experience/experience.component').then(c => c.ExperienceComponent)
    },
    {
      path: 'open-source',
      loadComponent: () => import('./pages/open-source/open-source.component').then(c => c.OpenSourceComponent)
    },
    { path: '',   component: HomeComponent, pathMatch: 'full' }, // redirect to `first-component`
    // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];