import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from './event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
})
export class EventFormComponent {
  event = {
    title: '',
    description: '',
    location: '',
    event_date: ''
  };

  constructor(private eventService: EventService, private router: Router) {}

  onSubmit(): void {
    this.eventService.createEvent(this.event).subscribe({
      next: () => {
        console.log('Event created successfully');
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error('Error creating event:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }
}
