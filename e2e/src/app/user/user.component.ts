import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.toastr.success("до запроса")
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const data: any = {
    'url': 'ws://localhost:3000'
    };
    this.http.post("http://localhost:3100/subscribe", <JSON>data, httpOptions).subscribe(data => {
    console.log(data);
    });
    console.log("после запроса2");
    }
}
