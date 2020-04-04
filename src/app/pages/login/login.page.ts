import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public data = {
    email: '',
    password: ''
  };

  constructor(public core: CoreService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams.msg==='accountactivated') {
      this.core.successToast(null, 'Su cuenta ha sido activada con éxito, ahora puede iniciar sesión', 30000);
    }
    if (this.activatedRoute.snapshot.queryParams.msg==='logout') {
      this.core.successToast(null, 'Ha cerrado sesión, nos vemos pronto!', 10000);
    }
    if (this.activatedRoute.snapshot.queryParams.msg==='expired') {
      this.core.errorToast(null, 'Su sesión se ha cerrado por seguridad, inicie sesión de nuevo', 10000);
    }
  }

  login() {
    this.core.createLoading().then(loading => {
      this.core.auth.login(this.data, () => {
        loading.dismiss();
        this.core.navCtrl.navigateRoot('/');
      }, err => this.core.errorToast(loading, err, 3000));
    });
  }

}
