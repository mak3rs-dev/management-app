import { Injectable } from '@angular/core';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private data = {user: null, token: null};
  public get user() { return this.data.user; }
  public get token() { return (this.data.token)?'Bearer '+this.data.token.access_token:null; }

  private core: CoreService;
  public initCore = (core: CoreService) => {
    this.core=core;
    this.initChecks();
  };

  constructor() {}

  private initChecks() {
    let sess = JSON.parse(localStorage.getItem('session'));
    if (sess) this.data = sess;

    if (this.token) {
      this.core.api.me().subscribe(user => {
        this.data.user = user;
        this.core.isLoggedIn=true;

        this.updateStorage();
      }, () => {
        this.data = {user: null, token: null};
        this.updateStorage();
        this.core.errorToast(null, 'Su sesión anterior ha sido cerrada por seguridad', 15000);
      });
    }
  }

  public login(data, cbSuccess:Function=null, cbErr:Function=null) {
    let handleErr = (err) => {
      if (cbErr) {
        cbErr(err);
      } else {
        this.core.errorToast();
        console.error('Error in login request', err);
      }
    }

    this.core.api.login(data).subscribe(sess => {
      this.data.token = sess;
      this.core.api.me().subscribe(user => {
        this.data.user = user;
        this.core.isLoggedIn=true;

        this.updateStorage();

        if (cbSuccess) cbSuccess();
      }, err => handleErr(err));
    }, err => handleErr(err));
  }

  public logout() {
    this.core.api.logout().subscribe(() => {
      this.data = {user: null, token: null};
      this.updateStorage();
    }, () => {}); // TODO: Handle error
  }

  updateStorage() {
    localStorage.setItem('session', JSON.stringify(this.data));
  }

}
