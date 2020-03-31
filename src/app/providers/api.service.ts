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

  // COMMUNITIES
  getCommunities = (page:number=1) => this.http.get(this.core.env.endpoint+'communities/all?page='+page, (this.core.isLoggedIn)?{headers:{Authorization: this.core.auth.token}}:{});
  getCommunity = (alias:string) => this.http.get(this.core.env.endpoint+'communities/alias/'+alias, (this.core.isLoggedIn)?{headers:{Authorization: this.core.auth.token}}:{});
  updateCommunity = (data:any) => this.http.put(this.core.env.endpoint+'communities/update', data, {headers:{Authorization: this.core.auth.token}});
  joinCommunity = (uuid:string) => this.http.post(this.core.env.endpoint+'communities/join', {community: uuid}, (this.core.isLoggedIn)?{headers:{Authorization: this.core.auth.token}}:{});
  getCommunityRanking = (alias:string, page:number=1) => this.http.get(this.core.env.endpoint+'communities/ranking/'+alias+'?page='+page, {headers:{Authorization: this.core.auth.token}});
  getCommunityPieces = (uuid:string, page:number=1) => this.http.get(this.core.env.endpoint+'pieces/all?community='+uuid+'?page='+page, {headers:{Authorization: this.core.auth.token}});


  // USER
  getCommunitiesByUser = (page:number=1) => this.http.get(this.core.env.endpoint+'users/communities?page='+page, {headers:{Authorization: this.core.auth.token}});
  getCommunityStock = (uuid:string) => this.http.get(this.core.env.endpoint+'communities/stock?uuid='+uuid, {headers:{Authorization: this.core.auth.token}});


}
