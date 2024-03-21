import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../service/hospital.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-doctorforgotpassword',
  templateUrl: './doctorforgotpassword.component.html',
  styleUrls: ['./doctorforgotpassword.component.scss']
})
export class DoctorforgotpasswordComponent implements OnInit {
  email: string= '';
  isShowChangePassword: boolean = false;
  newPassword: string = '';
  doctor: any;
  constructor(private service: HospitalService,
    private route: Router) {
    
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const body = {
      doctorEmailId: this.email
    };
    this.service.doctorForgotPassword(body).pipe(take(1)).subscribe((res) => {
      if (!!res && res?.doctorId) {
        this.doctor = res;
        this.isShowChangePassword = true;
      }
    }, err => {
      this.isShowChangePassword = false;
      alert("Patient not found . Please check email address.")
    });
  }

  onChangePassword(): void {
    this.doctor.password = this.newPassword;
    this.service.doctorChangePassword(this.doctor?.doctorId,this.newPassword).pipe(take(1)).subscribe((res) => {
      if (res && res.doctorId) {
        alert("Password has been change successfully");
        this.route.navigate(["/doctor-login"]);
      }
    }, error => {
      alert("Error occured while change password.");
    });
  }

}
