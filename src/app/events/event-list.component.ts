import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from './event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-3">
      <h2>Event List</h2>
      <a routerLink="/new" class="btn btn-primary mb-3">Create New Event</a>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let event of events">
            <td>{{ event.event_id }}</td>
            <td>{{ event.title }}</td>
            <td>{{ event.event_date }}</td>
            <td>
              <a [routerLink]="['/events', event.event_id]" class="btn btn-info btn-sm">View</a>
              <a [routerLink]="['/edit', event.event_id]" class="btn btn-warning btn-sm">Edit</a>
              <button (click)="deleteEvent(event.event_id)" class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents(); // Reload events after deletion
      });
    }
  }
}
