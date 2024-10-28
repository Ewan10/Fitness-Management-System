import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthenticationService,
    private router: Router) { }

  signUpForm: FormGroup;
  user: User;
  isLoading: boolean;
  errorMessage: string;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required)
    });
  }


  onSignUp() {
    if (this.signUpForm.value.password !==
      this.signUpForm.value.confirmPassword) {
      this.errorMessage = 'The two passwords must be the same. Try again.';
    }
    const user = {
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    };
    this.isLoading = true;
    this.authService.signUp(user)
      .subscribe((response) => {
        this.user = response;
        this.router.navigate(['/']);
        this.isLoading = false;
        localStorage.setItem('user', JSON.stringify(this.user));
      },
        (error) => {
          if (error.error?.message) {
            this.errorMessage = error;
            this.isLoading = false;
          }
          else {
            this.errorMessage = "An unexpected error occured.";
          }
        }
      );
  }


}
