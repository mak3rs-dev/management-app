import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { PrivacyComponentPage } from 'src/app/components/privacy/privacy';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public data = {
    alias: "",
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
    cp: "",
    privacy_policy_accept: false,
  }

  constructor(public core: CoreService) { }

  register() {
    if (this.data.privacy_policy_accept) {
      this.core.createLoading().then(loading => {
        this.core.api.register(this.data).subscribe(_ => {
          this.core.successToast(loading, 'Se ha creado su cuenta correctamente, para iniciar sesión debe de confirmar su correo electrónico. \n\nPor favor, REVISE LA CARPETA DE SPAM/NO DESEADO', 15000);
          this.core.navCtrl.navigateRoot('/login');
        }, err => this.core.errorToast(loading, err, 5000));
      });
    } else {
      this.core.errorToast(null, 'Debes aceptar primero la política de privacidad');
    }
  }

  openPrivacyPolicy() {
    PrivacyComponentPage.Open(false, this.core);
  }

}
