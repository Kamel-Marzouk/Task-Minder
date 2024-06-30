import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  public login(credentials: User, onSuccess: () => void, onError: () => void): void {
    this.httpService.getAll("/users").subscribe((users: any[]) => {
      if (!users.length) return;
      const user = users.find((user) => user.email === credentials.email && user.password === credentials.password);
      if (!user) onError();
      else {
        onSuccess();
        delete user['password'];
        localStorage.setItem("userInfo", JSON.stringify(user));
        this.router.navigate(['/tasks']);
      }
    })
  }

  public signup(user: User, onSuccess: () => void, onError: () => void): void {
    delete user['confirmPassword'];
    this.httpService.create("/users", user).subscribe(() => {
      onSuccess();
    }, () => {
      onError();
    })
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem("userInfo")) return true;
    return false;
  }

  public logout(): void {
    localStorage.removeItem("userInfo");
    this.router.navigate(['/']);
  }

  public checkAuth(): void {
    if (this.isAuthenticated()) this.router.navigate(['tasks']);
    else this.router.navigate(['/']);
  }

}
