import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { EditcollectComponentPage } from '../community-module/components/editcollect/editcollect';

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
      this.core.api.getCommunitiesByUser(page).subscribe((Res:any) => {
        Res.data.forEach(itm => {
          itm.collect = null;
          this.core.api.getCollectControl(itm.alias, null, 'COLLECT:REQUESTED').subscribe((res:any) => {
            if (res.data && res.data[0]) itm.collect = res.data[0];
          }, err => this.core.errorToast(null, err));
        });
        this.data = Res;
        loading.dismiss();
      }, err => this.core.errorToast(loading, err));
    });
  }

  editCollect(community) {
    community.collect.pieces.forEach(p => {
      p.uuid = p.piece.uuid;
      p.picture = p.piece.picture;
      p.name = p.piece.name;
    });
    community.collect.materials.forEach(p => {
      p.uuid = p.material_request.piece.uuid;
      p.units = p.units_delivered;
    });
    community.collect.admin = false;
    community.collect.community = community.uuid;
    community.collect.community_alias = community.alias;
    community.collect.collect = community.collect.id;
    community.collect.user = community.collect.user_uuid;
    community.collect.address = community.collect.collect_address;
    community.collect.address_description = community.collect.collect_address_description;
    community.collect.location = community.collect.collect_location;
    community.collect.province = community.collect.collect_province;
    community.collect.state = community.collect.collect_state;
    community.collect.country = community.collect.collect_country;
    community.collect.cp = community.collect.collect_cp;

    EditcollectComponentPage.Open(community.collect, this.core, () =>  this.refresh());
  }

}
