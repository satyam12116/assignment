import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RoomListComponent } from "../room-list/room-list.component";
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
@Component({
    selector: 'app-room-detail',
    standalone: true,
    templateUrl: './room-detail.component.html',
    styleUrl: './room-detail.component.scss',
    imports: [FormsModule, RoomListComponent,CommonModule,
      MatDatepickerModule,
      MatInputModule]
})
export class RoomDetailComponent implements OnInit {
 
  @Input() room: any;
  @Input() selectedDate: any;
  selectedTime: any;
  constructor(private roomService: RoomService) { }
  currentMonth!: Date;
  daysInMonth: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  datesInMonth: Date[] = [];

  generateCalendar() {
    this.datesInMonth = [];
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      this.datesInMonth.push(new Date(year, month, i));
    }
  }

  onDateChange(room: any) {
    this.selectedTime = null;
  }
  isDateSelected(date: any): boolean {
    return this.selectedDate && new Date(this.selectedDate).getDate() == date.getDate();
  }
  ngOnInit(): void {
    this.currentMonth = new Date();
    this.generateCalendar();
    this.selectedDate=this.selectedDate.split('T')[0]
    
  }
  bookRoom(): void {
   console.log(this.selectedTime,'hii')
   const body={
    id:this.selectedTime.id,
    time:this.selectedTime.time,
    date:this.room.dates[0].date,
   }
    this.roomService.bookRoom(body).subscribe((response:any) => {
      alert(response.message);
    });
  }
  selectTime(timeEntry: any) {
    if (!timeEntry.booked) {
      console.log(timeEntry,'this.selectedTime')
      this.selectedTime = timeEntry;
    }
  }
}
