import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MainReportComponent } from './screens/main-report/main-report.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, MainReportComponent, ProfileComponent]
})
export class HomePageModule {}
