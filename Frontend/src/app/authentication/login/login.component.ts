import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from '../user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
    });
  }

  loginForm: FormGroup
  isLoading = false;
  user: User;
  errorMessage: string;

  onLogin() {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.isLoading = true;
    this.authService.login(user)
      .subscribe((response) => {
        this.user = response;
        this.router.navigate(['/']);
        this.isLoading = false;
        localStorage.setItem('user', JSON.stringify(this.user));
      },
        (error) => {
          if (error.error?.status) {
            this.errorMessage = error.error?.status;
            this.isLoading = false;
            console.log(error.error?.status)
          }
          else {
            this.isLoading = false;
            this.errorMessage = "An unexpected error occured.";
          }
        }
      );
  }
}
