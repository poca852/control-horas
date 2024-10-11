import { Component, OnInit } from '@angular/core';
import { WorkShedules } from 'src/app/models/work-shedules';
import { UtilsService } from 'src/app/services/utils-service.service';
import { WorkSheduleService } from 'src/app/services/work-shedule.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  public workSchedules: WorkShedules[] = [];
  public numberOfMonth: number = 0;

  constructor(
    private utilsSvc: UtilsService,
    private workSchedulesSvc: WorkSheduleService,
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.numberOfMonth = new Date().getMonth();

    this.workSchedulesSvc.getWorkSchedulesByUser(this.numberOfMonth)
      .subscribe( (workSchedules) => this.workSchedules = workSchedules);

  }

  sumarHoras() {

    let totalHours: number = 0;

    for (const workSchedule of this.workSchedules) {

      if(workSchedule.hoursWorked){
        totalHours += Number(workSchedule.hoursWorked);
      }
      
    }

    return totalHours

  }

  public onChangeDate(n: any) {
    this.workSchedulesSvc.getWorkSchedulesByUser(n)
      .subscribe( (workSchedules) => this.workSchedules = workSchedules);
  }

 

}
