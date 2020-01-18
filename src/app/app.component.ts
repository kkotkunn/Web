import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'my-app';
  constructor(private router: Router) {}

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
