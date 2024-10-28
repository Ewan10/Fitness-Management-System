import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environmnets/environments';
import { User } from '../authentication/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  user = new BehaviorSubject<User>(null);
  url = environment.url;

  signUp(user) {
    return this.http.post<User>(this.url + "/signUp", user)
      .pipe(catchError(this.handleError),
        tap(response => {
          this.handleAuthentication(
            response._id,
            response.name,
            response.email,
            response.token,
            response.expiresInMiliSec
          )
        })
      );
  }

  login(user: any) {
    return this.http.post<User>(this.url + '/login', user)
      .pipe(catchError(this.handleError),
        tap(response => {
          this.handleAuthentication(
            response._id,
            response.name,
            response.email,
            response.token,
            response.expiresInMiliSec
          )
        })
      );
  }

  private handleAuthentication(
    id: string,
    userName: string,
    email: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(id, userName, email, token, null, expiresIn, expirationDate);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = `Authentication failed due to unknown error.`;
    if (!errorResponse.message || !errorResponse.error.message) {
      return throwError(errorMessage);
    }
    if (errorResponse.error?.message) {
      errorMessage = errorResponse.error?.message;
      return throwError(errorMessage)
    }
    else {
      return throwError(errorMessage)
    }
  }

  logout() {
    this.user.next(null);
  }

}
