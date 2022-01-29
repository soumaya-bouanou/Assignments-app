import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
user = new User();
erreur=0;
constructor(public authService : AuthService,
  public router: Router) { }

ngOnInit(): void {
}

onLoggedin()
{
console.log(this.user);
let isValidUser: Boolean = this.authService.SignIn(this.user);

if (isValidUser)
{
this.router.navigate(['/']);     
}
else
//alert('mot de passe incorrect');
this.erreur=1;
}


}