export interface WorkShedules {
  _id?: string;
  employeeId: string;
  workDate: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  hoursWorked?: Number;
  isReportGenerated?: Boolean;
}