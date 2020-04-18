import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateStockComponentPage } from './updatestock/updatestock';
import { EditcollectComponentPage } from './editcollect/editcollect';
import { FiltersComponentPage } from './filters/filters';

const COMPONENTS = [
	UpdateStockComponentPage,
	EditcollectComponentPage,
	FiltersComponentPage
]

@NgModule({
	declarations: [...COMPONENTS],
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
	],
	entryComponents: [...COMPONENTS],
	exports: [...COMPONENTS]
})
export class ComponentsModule { }
