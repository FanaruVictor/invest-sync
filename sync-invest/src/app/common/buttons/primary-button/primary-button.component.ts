import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
})
export class PrimaryButtonComponent {
  @Input() type: string = 'button';
  @Input({ required: true }) text: string = '';
  @Output() clickEvent = new EventEmitter();

  click() {
    this.clickEvent.emit();
  }
}
