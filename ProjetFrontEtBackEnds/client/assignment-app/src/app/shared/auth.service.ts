import { Injectable } from '@angular/core';
import { User } from '../assignments/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [{ "username": "admin", "password": "admin", "roles": ['ADMIN'] },
  { "username": "user", "password": "user", "roles": ['USER'] }];

  public loggedUser?: string;
  public isloggedIn: Boolean = false;
  public roles?: string[];


  constructor(private router: Router) { }



  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined;
    this.roles = undefined;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }

  SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username === curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', String(this.loggedUser));
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });

    return validUser;
  }

  isAdmin():Boolean{
    console.log("roles "+this.roles);
    if (!this.roles) //this.roles== undefiened
        return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    }


 
}
