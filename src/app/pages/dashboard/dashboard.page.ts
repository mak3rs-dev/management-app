import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  data: any = null;

  constructor(public core: CoreService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(page:number=1) {
    this.core.createLoading().then(loading => {
      this.core.api.getCommunitiesByUser(page).subscribe(Res => {
        this.data = Res;
        loading.dismiss();
      }, err => this.core.errorToast(loading, err));
    });
  }

}
