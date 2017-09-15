import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  
  @Output() updatedDate: EventEmitter<Date> = new EventEmitter();
  
  constructor() {
  }

  updateDate(newDate) {
      this.updatedDate.emit(newDate);
    }
  
}
