import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateStockComponentPage } from './updatestock/updatestock';

const COMPONENTS = [
	UpdateStockComponentPage
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
