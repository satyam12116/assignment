import { Component, Input } from '@angular/core';
import { RoomService } from '../room.service';
import { RoomDetailComponent } from "../room-detail/room-detail.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-room-list',
    standalone: true,
    templateUrl: './room-list.component.html',
    styleUrl: './room-list.component.scss',
    imports: [RoomDetailComponent,CommonModule,FormsModule]
})
export class RoomListComponent {
   rooms: any[] = [];
  selectedRoom: any = null;
  time: string = '';
  selectedDate: any=null;
  constructor(private roomService: RoomService) { }
  
  ngOnInit(): void {
    // this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRoom(this.time).subscribe((rooms:any) =>{ 
      this.rooms =this.transformRooms(rooms);
      // this.transformedRooms = this.transformRooms(this.rooms);
      console.log(this.rooms )
    });
  }

  onSearch(): void {
    this.getRooms();
  }

  onSelect(room: any): void {
    this.selectedRoom = room;
    this.selectedDate=room.dates[0].date;
  }
  transformRooms(rooms: any[]) {
    const roomMap = new Map();

    rooms.forEach(room => {
      if (!roomMap.has(room.name)) {
        roomMap.set(room.name, []);
      }
      const datesArray = roomMap.get(room.name);

      let dateEntry = datesArray.find((entry: any) => entry.date === room.date);

      if (!dateEntry) {
        dateEntry = {
          date: room.date,
          seat: room.seat,
          times: []
        };
        datesArray.push(dateEntry);
      }

      dateEntry.times.push({id:room.id, time: room.time, booked: room.booked });
    });

    return Array.from(roomMap, ([name, dates]) => ({ name, dates }));
  }
}
