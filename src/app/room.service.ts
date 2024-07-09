import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http:HttpClient) { }
   private apiUrl='http://localhost:3000/api';

   getRoom(time:String){
    let url=`${this.apiUrl}/rooms`
    // if(time){
    //   url+=`?time=${time}`;
    // }
    return this.http.get(url);
   }
   bookRoom(body:any){
    let url=`${this.apiUrl}/book`
    
    return this.http.post(url,body);
   }
}
