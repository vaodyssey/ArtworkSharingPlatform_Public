import { Component } from '@angular/core';
import {AccountService} from "../../_services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private accountService: AccountService, private router: Router) {
  }

  login() {
    this.accountService.login();
    this.router.navigateByUrl('/');
  }



}
