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
  recoverPass = (email:string) => this.http.post(this.core.env.endpoint+'auth/recovery-password', {email:email}, {headers:{Authorization: this.core.auth.token}});
  changePass = data => this.http.post(this.core.env.endpoint+'auth/recovery-hash', data, {headers:{Authorization: this.core.auth.token}});

  // COMMUNITIES
  getCommunities = (page:number=1) => this.http.get(this.core.env.endpoint+'communities/all?page='+page, (this.core.isLoggedIn)?{headers:{Authorization: this.core.auth.token}}:{});
  getCommunity = (alias:string) => this.http.get(this.core.env.endpoint+'communities/alias/'+alias, (this.core.isLoggedIn)?{headers:{Authorization: this.core.auth.token}}:{});
  updateCommunity = (data:any) => this.http.put(this.core.env.endpoint+'communities/update', data, {headers:{Authorization: this.core.auth.token}});
  joinCommunity = (uuid:string) => this.http.post(this.core.env.endpoint+'communities/join', {community: uuid}, (this.core.isLoggedIn)?{headers:{Authorization: this.core.auth.token}}:{});
  getCommunityRanking = (alias:string, page:number=1) => this.http.get(this.core.env.endpoint+'communities/ranking/'+alias+'?page='+page, {headers:{Authorization: this.core.auth.token}});
  getCommunityStock = (alias:string, page:number=1) => this.http.get(this.core.env.endpoint+'communities/ranking/'+alias+'/stock?page='+page, {headers:{Authorization: this.core.auth.token}});
  getCommunityPieces = (uuid:string, type:null|'piece'|'material'='piece', page:number=1) => this.http.get(this.core.env.endpoint+'pieces/all?community='+uuid+'&type_piece='+type+'&page='+page, {headers:{Authorization: this.core.auth.token}});

  // COLLECT CONTROL
  addCollectControl = (data:any) => this.http.post(this.core.env.endpoint+'communities/collect/add', data, {headers:{Authorization: this.core.auth.token}});
  updateCollectControl = (data:any) => this.http.put(this.core.env.endpoint+'communities/collect/update', data, {headers:{Authorization: this.core.auth.token}});
  getCollectControl = (alias:string, uuid_user:string=null, status:string=null, page:string|number=1) => this.http.get(this.core.env.endpoint+'communities/collect/'+alias+'?user='+(uuid_user||'')+'&status_code='+(status||'')+'&page='+page, {headers:{Authorization: this.core.auth.token}});
  // deleteCollectControl = (uuid:string|number) => this.http.delete(this.core.env.endpoint+'communities/collect/update?uuid=', {headers:{Authorization: this.core.auth.token}});
  getCollectControlCsv = (alias:string, uuid_user:string=null, status:string=null) => this.http.get(this.core.env.endpoint+'communities/collect/'+alias+'/export?user='+(uuid_user||'')+'&status_code='+(status||''), {
    responseType: 'blob' as 'json',
    headers: {Authorization: this.core.auth.token}
  }).toPromise();

  // USER
  getCommunityPiecesByUser = (uuid:string, page:number=1, user:string='') => this.http.get(this.core.env.endpoint+'pieces/all?type_piece=piece&community='+uuid+'&page='+page+'&user='+user, {headers:{Authorization: this.core.auth.token}});
  getCommunitiesByUser = (page:number=1) => this.http.get(this.core.env.endpoint+'users/communities?page='+page, {headers:{Authorization: this.core.auth.token}});
  getRankingByUserPiece = (alias:string, user:string, piece:string) => this.http.get(this.core.env.endpoint+'communities/ranking/'+alias+'?piece='+piece+'&user='+user, {headers:{Authorization: this.core.auth.token}});
  putNewPieceUnits = (uuid_community:string, uuid_piece:string, units:number) => this.http.post(this.core.env.endpoint+'communities/piece/add-or-update', {uuid_community: uuid_community,uuid_piece: uuid_piece,units: units}, {headers:{Authorization: this.core.auth.token}});
  putNewMaterialUnits = (uuid_community:string, uuid_piece:string, units:number) => this.http.post(this.core.env.endpoint+'communities/materials/add-or-update', {uuid_community: uuid_community,uuid_piece: uuid_piece,units: units}, {headers:{Authorization: this.core.auth.token}});
  getMaterialUnits = (alias:string, uuid_piece:string, user:string='') => this.http.get(this.core.env.endpoint+'communities/materials/'+alias+'?piece='+uuid_piece+'&user='+user, {headers:{Authorization: this.core.auth.token}});
  confirmPrivacyPolicy = () => this.http.patch(this.core.env.endpoint+'auth/policy', null, {headers:{Authorization: this.core.auth.token}});
  setPieceValidation = (user_uuid:string, piece_uuid:string, validate:boolean) => this.http.patch(this.core.env.endpoint+'pieces/validate', {user:user_uuid, piece:piece_uuid, validate:validate}, {headers:{Authorization: this.core.auth.token}});

}
