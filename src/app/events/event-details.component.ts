import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EventDetailsComponent implements OnInit {
  event: any;
  updatedEvent: any = {}; 
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEvent(eventId);
  }

  loadEvent(id: number): void {
    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        console.log('Event details loaded:', data);
        this.event = data;
        this.updatedEvent = { ...data };
      },
      error: (err) => console.error('Error loading event:', err)
    });
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  onSubmitUpdate(): void {
    console.log('Submitting update:', this.updatedEvent);
    this.eventService.updateEvent(this.event.event_id, this.updatedEvent).subscribe({
      next: () => {
        console.log('Event updated successfully');
        this.isEditing = false;
        this.loadEvent(this.event.event_id);
      },
      error: (err) => console.error('Error updating event:', err)
    });
  }

  cancelUpdate(): void {
    this.isEditing = false;
    this.updatedEvent = { ...this.event };
  }

  confirmDelete(): void {
    const userConfirmed = confirm('Are you sure you want to delete this event?');
    if (userConfirmed) {
      this.deleteEvent();
    }
  }
  
  deleteEvent(): void {
    this.eventService.deleteEvent(this.event.event_id).subscribe({
      next: () => {
        console.log('Event deleted successfully');
        this.router.navigate(['/events']);
      },
      error: (err) => console.error('Error deleting event:', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }
}