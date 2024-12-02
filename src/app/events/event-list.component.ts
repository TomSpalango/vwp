import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Event } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrls: []
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (data) => {
        this.events = data;
        console.log('Fetched Events:', this.events); // What's being fetched?
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}
