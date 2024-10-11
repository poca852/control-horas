import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { RegisterComponent } from './components/register/register.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    RegisterComponent,
  ]
})
export class SharedModule { }
