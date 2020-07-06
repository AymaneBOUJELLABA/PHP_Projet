import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichePageRoutingModule } from './fiche-routing.module';

import { FichePage } from './fiche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichePageRoutingModule
  ],
  declarations: [FichePage]
})
export class FichePageModule {}
