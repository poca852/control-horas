import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../../services/utils-service.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { RegisterComponent } from 'src/app/shared/components/register/register.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public utilSvc = inject(UtilsService);
  public authSvc = inject(AuthService);

  public form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit() {
  }

  public async submit() {
    
    if( this.form.valid ){

      const { username, password } = this.form.value;

      const loading = await this.utilSvc.loading();
      await loading.present();

      this.authSvc.login(username, password).subscribe({
        next: async (isAuth) => {
          
          await loading.dismiss();

          if(isAuth){
            let user = this.utilSvc.getFromLocalStorage('user') as User;

            this.utilSvc.routerLink('/home');


            this.utilSvc.presentToast({
              message: `Te damos la bienvenida ${user.fullName.toLowerCase()}`,
              duration: 1000,
              color: 'primary',
              position: 'middle',
              icon: 'person-circle-outline'
            })

            this.form.reset();
            
            return;
          }
          
          this.form.reset();

        },
        error: err => {

          this.utilSvc.presentToast({
            message: err.error.message,
            duration: 1000,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-outline'
          })

          loading.dismiss();

        }
      })

    }

  }

  async openRegisterModal() {
    await this.utilSvc.presentModal({
      component: RegisterComponent,
    })
  }

}
