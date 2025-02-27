import { afterRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-template';

  constructor() {
    afterRender(() => {
      AOS.init({
        // Your AOS configuration options here
        duration: 2000
      });
    });
  }
}
