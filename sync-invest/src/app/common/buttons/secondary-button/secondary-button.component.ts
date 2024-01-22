import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './secondary-button.component.html',
  styleUrl: './secondary-button.component.scss',
})
export class SecondaryButtonComponent {
  @Input() type: string = 'button';
  @Input({ required: true }) text: string = '';
  @Input() width: string = '';
  @Input() isActive: boolean = false;
  @Output() clickEvent = new EventEmitter();

  click() {
    this.clickEvent.emit();
  }
}
