import { Component, inject, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;

  @Input() backButton: string;

  @Input() isModal: boolean;

  @Input() isLogout?: boolean;

  @Input() showMenu: boolean;

  public utilSvc = inject(UtilsService);
  public authSvc = inject(AuthService);

  constructor() { }

  ngOnInit() {}

  public dismissModal = () => {
    this.utilSvc.dismissModal();
  }

  public logout() {

    this.authSvc.logout()

  }

}
