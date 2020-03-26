import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public core: CoreService) { }

  ngOnInit() {
    this.core.isLoggedIn=true;
  }

}
