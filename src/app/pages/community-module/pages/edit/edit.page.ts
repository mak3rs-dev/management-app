import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  data:any = null;

  constructor(public core: CoreService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.core.createLoading().then(loading => {
      let handleErr = () => this.core.errorToast(loading, 'La comunidad seleccionada no es válida').then(()=> {
        this.core.navCtrl.navigateRoot('/community');
      });

      if (this.activatedRoute.snapshot.params.alias) {
        this.core.api.getCommunity(this.activatedRoute.snapshot.params.alias).subscribe(Res => {
          this.data = Res;
        }, handleErr);
      } else handleErr();
    })
  }

}
