import { Routes } from '@angular/router';
import { EventListComponent } from './events/event-list.component';
import { EventDetailsComponent } from './events/event-details.component';
import { EventFormComponent } from './events/event-form.component';

export const routes: Routes = [
    { path: 'events', component: EventListComponent },
    { path: 'events/create', component: EventFormComponent },
    { path: 'events/:id', component: EventDetailsComponent },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: '**', redirectTo: '/events', pathMatch: 'full' }
  ];  