import { Component,OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
orders:any
  constructor(private http:HttpService) { }
  isCollapsed = true;

  ngOnInit(): void {
    this.http.get("orders").subscribe((data)=>{
      if(data.status===200){
        this.orders=data.body
      }
    })
  }
}
