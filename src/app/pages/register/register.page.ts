import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public data = {
    email: "",
    password: "",
    password_confirm: "",
    phone: "",
    name: "",
    address: "",
    location: "",
    province: "",
    state: "",
    country: "",
    cp: ""
  }

  constructor(public core: CoreService) { }

  register() {
    this.core.createLoading().then(loading => {
      this.core.api.register(this.data).subscribe(_ => {
        this.core.successToast(loading);
      }, err => {
        // TODO: Handle errors properly
        this.core.errorToast(loading);
        console.error('Error registering', err);
      });
    });
  }

}
