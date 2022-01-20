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


  loggedIn = false;
  loggedOut = false;



  // appelé quand on a rempli le formulaire login/password
  // devrait prendre en params le login et le pass
  logIn() {
    this.loggedIn = true;
  }

  // appelé par bouton de deconnexion
  logOut() {
    this.loggedOut = false;
  }

  // vérification du rôle. Dans cet exemple simple on dit qu'on est admin
  // juste si on est loggué. Dans la vraie vie, il faudrait vérifier que le
  // login est bien égal à admin etc.
  /*isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      // ici typiquement, on pourrait faire une requête
      // et donc ça prendrait du temps... c'est la raison
      // pour laquelle on renvoie une promesse....
      resolve(this.loggedIn);
    });

    return isUserAdmin;
  }*/

}
