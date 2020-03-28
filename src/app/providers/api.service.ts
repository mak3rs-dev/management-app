import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private core: CoreService;
  public initCore = (core: CoreService) => this.core=core;

  constructor(private http: HttpClient) {
  }

  // AUTH
  register = data => this.http.post(this.core.env.endpoint+'auth/register',data);
  login = data => this.http.post(this.core.env.endpoint+'auth/login',data);
  me = () => this.http.get(this.core.env.endpoint+'auth/me', {headers:{Authorization: this.core.auth.token}});
  logout = () => this.http.get(this.core.env.endpoint+'auth/logout', {headers:{Authorization: this.core.auth.token}});

  getCommunities = () => this.http.get(this.core.env.endpoint+'communities/all');
  getCommunity = (alias:string) => this.http.get(this.core.env.endpoint+'communities/alias/'+ alias);

}
