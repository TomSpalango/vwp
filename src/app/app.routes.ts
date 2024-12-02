import { Routes } from '@angular/router';
import { EventListComponent } from './events/event-list.component';
import { EventFormComponent } from './events/event-form.component';
import { EventDetailsComponent } from './events/event-details.component';

export const appRoutes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'new', component: EventFormComponent },
  { path: 'edit/:id', component: EventFormComponent },
  { path: 'events/:id', component: EventDetailsComponent }
];
