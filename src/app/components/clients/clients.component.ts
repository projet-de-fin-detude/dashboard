import { Component,OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
clients:any
  constructor(private http:HttpService) { }
ngOnInit(): void {
  this.http.get("users").subscribe((data)=>{
    if(data.status===200){
      this.clients=data.body
    }
  })
}
}
