import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/events" routerLinkActive="active">Events</a>
      <a routerLink="/events/new" routerLinkActive="active">Create Event</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterModule],
  styles: [
    `
      nav {
        display: flex;
        gap: 1rem;
        background-color: #f8f9fa;
        padding: 1rem;
        border-bottom: 1px solid #dee2e6;
      }
      nav a {
        text-decoration: none;
        color: #007bff;
      }
      nav a.active {
        font-weight: bold;
        color: #0056b3;
      }
    `,
  ],
})
export class AppComponent {}
