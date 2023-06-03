import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  constructor(private http: HttpService) { }
  analytics: any
  ngOnInit(): void {
    this.http.get("analytics").subscribe((data) => {
      if (data.status === 200) {
        console.log(data.body)
        this.analytics = data.body
      }
    })
  }
}
