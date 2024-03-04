import {Component, OnInit} from '@angular/core';
import {AccountService} from "./_services/account.service";
import {User} from "./_model/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isDarkTheme = true;
  defaultInv = '-gray-100'

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);

  }
}
