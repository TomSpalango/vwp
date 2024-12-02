import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from './event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-3">
      <h2>{{ isEditMode ? 'Edit Event' : 'Create New Event' }}</h2>
      <form [formGroup]="eventForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input id="title" type="text" class="form-control" formControlName="title" />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea id="description" class="form-control" formControlName="description"></textarea>
        </div>
        <div class="mb-3">
          <label for="event_date" class="form-label">Event Date</label>
          <input id="event_date" type="date" class="form-control" formControlName="event_date" />
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="eventForm.invalid">
          {{ isEditMode ? 'Update Event' : 'Create Event' }}
        </button>
      </form>
    </div>
  `
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  isEditMode: boolean = false;
  eventId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      event_date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.eventId = +id;
      this.loadEventDetails(this.eventId);
    }
  }

  loadEventDetails(id: number): void {
    this.eventService.getEventById(id).subscribe((event) => {
      this.eventForm.patchValue(event);
    });
  }

  onSubmit(): void {
    if (this.eventForm.invalid) return;

    const eventData = this.eventForm.value;

    if (this.isEditMode && this.eventId) {
      this.eventService.updateEvent(this.eventId, eventData).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.eventService.createEvent(eventData).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
