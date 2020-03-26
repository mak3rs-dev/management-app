import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  public env: any = environment;
  public isLoggedIn = false;

  constructor() {
    if (!this.env.production) console.log('Loaded env: ', this.env);
  }

}
