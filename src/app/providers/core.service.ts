import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ToastController, LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { AuthService } from './auth/auth.service';
import { PrivacyComponentPage } from '../components/privacy/privacy';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public env: any = environment;
  get isLoggedIn() { return this.auth.token!=''; };

  constructor(
    public api: ApiService,
    public auth: AuthService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
    api.initCore(this);
    auth.initCore(this);

    if (!this.env.production) console.log('Loaded env: ', this.env);
  }

  public async createLoading(text=null, noPresent=false) {
    let loading = await this.loadingCtrl.create({message: text});
    if (!noPresent) await loading.present();
    return loading;
  }

  public async successToast(loading=null, message=null, duration=null) {
    if (loading) loading.dismiss();
    await (await this.toastCtrl.create({
      message: message||'Se ha completado la acción correctamente',
      duration: duration||3000,
      color: 'success',
      buttons: [{text:'OK', role:'cancel'}]
    })).present();
  }

  privacyOpen:boolean = false;

  public async errorToast(loading=null, message:any|string=null, duration=null) {
    if (loading) loading.dismiss();

    if (typeof message != 'string' && message!=null) {
      if (message.status && message.status==401 && this.isLoggedIn) {
        this.auth.logout(()=>this.navCtrl.navigateRoot('/login?msg=expired'));
      }
      if (message.error && message.error.code==-100) {
        if (!this.privacyOpen) {
          this.privacyOpen = true;
          PrivacyComponentPage.Open(true, this, () => this.privacyOpen=false);
        }
      }
      message = this.fetchErrMsg(message.error);
    }

    return await (await this.toastCtrl.create({
      message: message||'Se ha producido un error, inténtelo de nuevo más tarde',
      duration: duration||5000,
      color: 'danger',
      buttons: [{text:'OK', role:'cancel'}]
    })).present();
  }

  public fetchErrMsg(err) {
    if (err.error) return err.error;
    if (err.errors) {
      let msg = 'Se han producido los siguientes errores: ';
      for (let itm in err.errors) {
        msg += '\n- '+err.errors[itm].toString();
      }
      return msg;
    }
    if (Object.getPrototypeOf(err).toString().indexOf('ProgressEvent')) return 'Se ha producido un error de comunicación, por favor, compruebe su conexión.';
  }

}
