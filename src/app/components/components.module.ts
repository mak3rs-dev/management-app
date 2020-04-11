import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrivacyComponentPage } from './privacy/privacy';

const COMPONENTS = [
	PrivacyComponentPage
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
