import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  @Input({ required: true }) googleIcon: string = '';

  @Output() clickEvent = new EventEmitter();

  click() {
    console.log('asdfasd');
    this.clickEvent.emit();
  }
}
