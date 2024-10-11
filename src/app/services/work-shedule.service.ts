import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { WorkShedules } from '../models/work-shedules';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkSheduleService {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private authSvc: AuthService,
  ) { }

  addWorkShedule(workShedule: WorkShedules, action: string) {
    const url = `${this.baseUrl}/work-schedules?action=${action}`;

    return this.http.post<{ok: boolean}>(url, workShedule)
  }

  getWorkSchedulesByUser(month: number) {
    const url = `${this.baseUrl}/work-schedules/${this.authSvc.currentUser()._id}`;

    const params = new HttpParams()
      .append('month', month)

    return this.http.get<WorkShedules[]>(url, {params});
  }
}
