import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage {

  data = {
    email:'',
    hash: null,
    password: '',
    password_confirm: ''
  };

  constructor(public core: CoreService, private activatedRoute: ActivatedRoute) { }

  ionViewDidEnter() {
    if (this.activatedRoute.snapshot.queryParams.hash) {
      this.data.hash = this.activatedRoute.snapshot.queryParams.hash;
    }
  }

  requestMail() {
    this.core.createLoading().then(loading => {
      this.core.api.recoverPass(this.data.email).subscribe((Res:any) => {
        this.core.successToast(loading, Res.message);
      }, err => this.core.errorToast(loading, err));
    });
  }

  changePassword() {
    this.core.createLoading().then(loading => {
      this.core.api.changePass(this.data).subscribe((Res:any) => {
        this.core.successToast(loading, Res.message);
        this.core.navCtrl.navigateRoot('/login');
      }, err => this.core.errorToast(loading, err));
    });
  }

}
