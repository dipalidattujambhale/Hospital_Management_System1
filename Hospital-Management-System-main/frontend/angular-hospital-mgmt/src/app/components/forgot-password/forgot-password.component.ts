import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { HospitalService } from '../service/hospital.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string= '';
  isShowChangePassword: boolean = false;
  newPassword: string = '';
  patient: any;
  constructor(
    private service: HospitalService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const body = {
      patientEmailId: this.email
    };
    this.service.forgotPassword(body).pipe(take(1)).subscribe((res) => {
      if (!!res && res?.patientId) {
        this.patient = res;
        this.isShowChangePassword = true;
      }
    }, err => {
      this.isShowChangePassword = false;
      alert("Patient not found . Please check email address.")
    });
  }

  onChangePassword(): void {
    this.patient.password = this.newPassword;
    this.service.changePassword(this.patient?.patientId,this.newPassword).pipe(take(1)).subscribe((res) => {
      if (res && res.patientId) {
        alert("Password has been change successfully");
        this.route.navigate(["/patient-login"]);
      }
    }, error => {
      alert("Error occured while change password.");
    });
  }

}
