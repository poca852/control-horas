import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ProfileComponent } from './screens/profile/profile.component';
import { MainReportComponent } from './screens/main-report/main-report.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'mainReport',
        component: MainReportComponent
      },
      {
        path: '',
        redirectTo: 'mainReport',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
