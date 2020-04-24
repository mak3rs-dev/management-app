import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateStockComponentPage } from './updatestock/updatestock';
import { EditcollectComponentPage } from './editcollect/editcollect';
import { FiltersComponentPage } from './filters/filters';
import { IonicSelectableModule } from 'ionic-selectable';
import { Mak3rSelectComponentPage } from './mak3r-select/mak3r-select';

const COMPONENTS = [
	Mak3rSelectComponentPage,
	UpdateStockComponentPage,
	EditcollectComponentPage,
	FiltersComponentPage
]

@NgModule({
	declarations: [...COMPONENTS],
	imports: [
		IonicModule,
		CommonModule,
		IonicSelectableModule,
		FormsModule,
	],
	entryComponents: [...COMPONENTS],
	exports: [...COMPONENTS]
})
export class ComponentsModule { }
