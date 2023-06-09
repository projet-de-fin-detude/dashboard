import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any
  constructor(private http: HttpService) { }
  isCollapsed = true;

  ngOnInit(): void {
    this.http.get("orders").subscribe((data) => {
      if (data.status === 200) {
        this.orders = data.body
      }
    })
  }
  onChange(event: any, order: any) {
    let form = {
      status: event,
      id: order.id
    }
    this.http.post("edit_order", form).subscribe((data) => {
      if (data?.status === 200) {
        Object.assign(order, data.body)
        console.log('====================================');
        console.log(data.body);
        console.log('====================================');
      }
    })

  }
}
