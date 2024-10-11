import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AuthPageRoutingModule,
    SharedModule,
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
