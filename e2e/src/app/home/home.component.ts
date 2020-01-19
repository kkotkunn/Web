import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  userClaims: any;
 
  constructor(private router: Router, private userService: UserService, private http: HttpClient, private toastr: ToastrService) { }
 
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
 
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}