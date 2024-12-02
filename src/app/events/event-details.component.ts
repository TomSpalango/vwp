import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from './event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-3">
      <h2>Event Details</h2>
      <div *ngIf="event">
        <p><strong>Title:</strong> {{ event.title }}</p>
        <p><strong>Description:</strong> {{ event.description || 'No description available' }}</p>
        <p><strong>Date:</strong> {{ event.event_date }}</p>
        <p><strong>Created At:</strong> {{ event.created_at }}</p>
      </div>
      <div *ngIf="!event">
        <p>Loading event details...</p>
      </div>
      <button class="btn btn-primary" routerLink="/">Back to Events</button>
    </div>
  `
})
export class EventDetailsComponent implements OnInit {
  event: any = null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEventDetails(+id);
    }
  }

  loadEventDetails(id: number): void {
    this.eventService.getEventById(id).subscribe((data) => {
      this.event = data;
    });
  }
}
