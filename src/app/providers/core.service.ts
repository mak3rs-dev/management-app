import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public env: any = environment;
  public isLoggedIn = false;

  constructor(
    public api: ApiService,
    public auth: AuthService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController
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
      color: 'success'
    })).present();
  }

  public async errorToast(loading=null, message=null, duration=null) {
    if (loading) loading.dismiss();
    await (await this.toastCtrl.create({
      message: message||'Se ha producido un error, inténtelo de nuevo más tarde',
      duration: duration||3000,
      color: 'danger'
    })).present();
  }

}
