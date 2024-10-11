import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { UtilsService } from '../../../../services/utils-service.service';
import { AuthService } from '../../../../services/auth.service';
import { WorkShedules } from 'src/app/models/work-shedules';
import { ActionFromQrCode } from 'src/app/models/action.qr.enum';
import { WorkSheduleService } from '../../../../services/work-shedule.service';

@Component({
  selector: 'app-main-report',
  templateUrl: './main-report.component.html',
  styleUrls: ['./main-report.component.scss'],
})
export class MainReportComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private utilsSvc: UtilsService,
    private authSvc: AuthService,
    private workSheduleSvc: WorkSheduleService
  ) { }

  ngOnInit() { }

  async getActionFromQrImage(): Promise<string> {
    return await this.utilsSvc.startScan();
  }

  async startScan() {

    const today = new Date()
    const todayFormated = today.setHours(0, 0, 0, 0);

    const action = await this.utilsSvc.startScan();

    const workShedule: WorkShedules = {
      workDate: new Date(todayFormated),
      employeeId: this.authSvc.currentUser()._id,
    }

    if(action === ActionFromQrCode.ENTRADA) {

      workShedule.checkInTime = new Date();

      this.workSheduleSvc.addWorkShedule(workShedule, action).subscribe({
        next: (resp) => {
          this.utilsSvc.presentToast({
            duration: 2000,
            message: 'Jornada Iniciada',
            color: 'success',
            icon: 'checkmark-done-outline',
            position: 'middle'
          })
        },
        error: (err) => {
          this.utilsSvc.presentAlert({
            message: err.error.message,
            buttons: ['OK']
          })
        },
      })


      return;
    }

    workShedule.checkOutTime = new Date();

    this.workSheduleSvc.addWorkShedule(workShedule, action).subscribe({
      next: async (resp) => {
        
        this.utilsSvc.presentToast({
          duration: 2000,
          message: 'Fin de la Jornada',
          color: 'secondary',
          icon: 'checkmark-done-outline',
          position: 'middle'
        })

      },
      error: (err) => {
        this.utilsSvc.presentAlert({
          message: err.error.message,
          buttons: ['OK']
        })
      },
    })

    return;
    
  }

}
