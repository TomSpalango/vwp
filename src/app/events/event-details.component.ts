import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './event.service';
import { CommonModule, JsonPipe } from '@angular/common';

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
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEventDetails();
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
}
