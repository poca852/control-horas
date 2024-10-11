import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(
    private authSvc: AuthService,
    private utilsSvc: UtilsService,
  ) { }

  ngOnInit() {}

  register() {
    
    if(this.form.valid) {
      this.authSvc.register(this.form.value)
        .subscribe({
          next: (resp) => {

            if(resp.ok){

              this.utilsSvc.dismissModal({success: true});

              this.utilsSvc.presentToast({
                position: 'bottom',
                color: 'success',
                message: resp.msg,
                duration: 3000
              })

            }

          }
        })
    }

  }

}
