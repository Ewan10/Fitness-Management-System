import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }
  private userSubscriprition: Subscription;
  isAuthenticated = false;

  ngOnInit(): void {
    this.userSubscriprition = this.authService.user
      .subscribe((user) => this.isAuthenticated = !!user)
  }

  onLogout() {
    this.authService.logout();
  }

}
