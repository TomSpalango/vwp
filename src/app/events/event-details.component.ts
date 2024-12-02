import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './event.service';
import { CommonModule, JsonPipe } from '@angular/common'

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone: true,
  imports: [CommonModule, JsonPipe],
})
export class EventDetailsComponent implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(+id).subscribe({
        next: (data) => {
          this.event = data;
        },
        error: (err) => {
          console.error('Error fetching event details:', err);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }

  loadEventDetails(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Fetching details for event ID:', eventId);
  
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe({
        next: (data) => {
          console.log('Fetched event details:', data); // Check this log
          this.event = data; // Ensure this assignment is happening
        },
        error: (err) => {
          console.error('Error fetching event details:', err);
        },
      });
    } else {
      console.error('Invalid event ID:', eventId);
    }
  }

  updateEvent(): void {
    const updatedEvent = {
      ...this.event,
      title: `${this.event.title} (Updated)` // Example update
    };
    this.eventService.updateEvent(this.event.event_id, updatedEvent).subscribe({
      next: () => {
        console.log('Event updated successfully');
        this.event = updatedEvent; // Update local view
      },
      error: (err) => {
        console.error('Error updating event:', err);
      },
    });
  }

  deleteEvent(): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.event.event_id).subscribe({
        next: () => {
          console.log('Event deleted successfully');
          this.router.navigate(['/events']);
        },
        error: (err) => {
          console.error('Error deleting event:', err);
        },
      });
    }
  }
}
