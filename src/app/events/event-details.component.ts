import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class EventDetailsComponent implements OnInit {
  event: any = {};
  isEditing = false; // Toggle between view and edit mode

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEventDetails();
  }

  loadEventDetails(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(eventId).subscribe({
      next: (data) => {
        this.event = data;
        console.log('Event details loaded:', this.event);
      },
      error: (err) => {
        console.error('Error loading event details:', err);
      },
    });
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  onSubmitUpdate(event: Event): void {
    event.preventDefault();
    console.log('Updated event data being sent:', this.event);
    this.eventService.updateEvent(this.event.event_id, this.event).subscribe({
      next: (updatedEvent) => {
        console.log('Event updated successfully:', updatedEvent);
        this.isEditing = false;
        this.loadEventDetails();
      },
      error: (err) => {
        console.error('Error updating event:', err);
      }
    });
  }
  
  cancelUpdate(): void {
    this.isEditing = false;
    this.loadEventDetails();
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }
}
