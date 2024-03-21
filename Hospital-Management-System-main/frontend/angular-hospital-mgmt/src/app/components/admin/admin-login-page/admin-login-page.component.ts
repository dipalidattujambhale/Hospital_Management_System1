import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { HospitalService } from '../../service/hospital.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.scss']
})
export class AdminLoginPageComponent implements OnInit {
signInForm: FormGroup;
submitted = false;

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private hservice: HospitalService
) {
  this.signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}

ngOnInit(): void {
}

signIn(): void {
  this.submitted = true;

  if (this.signInForm.invalid) {
    alert("Please enter Valid information.");
    return;
  }

  const body = {
    adminEmailId: this.signInForm.value.email,
    adminPassword: this.signInForm.value.password
  };

  console.log("after body: ", body.adminEmailId, body.adminPassword);

  this.hservice.adminSignIn(body).pipe(take(1)).subscribe(
    (res: any) => {
      console.log("Response: ", res);
      if (res && res.adminId) {
        let userName = '';
        if (res.firstName) {
          userName += res.firstName;
        }
        if (res.lastName) {
          userName += ' ' + res.lastName;
        }
        this.hservice.storeAdminUserName(userName);
        this.hservice.storeAdminAuthorization(res.adminId);
        this.router.navigate(['/admin/home']);
      }
    },
    err => {
      console.log("Error: ", err);
      alert("Something went wrong in login! Please try again.");
    }
  );
}
}
