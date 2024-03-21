import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Doctor } from '../../model/doctor.modal';
import { HospitalService } from '../../service/hospital.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {
/*
  customer: any = {};
  doctor: Doctor[] = [];
  appointmentDate: string = "";
  meridiem: string = "am";
  appointmentTime: string = "";
  doctorId: number = 0;
  startDate: Date | undefined;
  constructor(
    private hService: HospitalService,
    private datePipe: DatePipe,
    private router: Router
  ) { 
    this.getCustomerDetail();
    this.getDoctorList();
  }

  ngOnInit(): void {
    this.startDate= new Date();
  }

  getCustomerDetail(): void {
    const cid = this.hService.getClientAuthorization();
    this.hService.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        if (!!res && res?.patientId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }

  getDoctorList(): void {
   
    this.hService.getDoctorList().pipe(take(1)).subscribe(
      (res: Doctor[]) => {
       if (!!res && Array.isArray(res) && res.length > 0) {
         this.doctor = res;
         this.doctorId = res[0]?.doctorId;
       }
      }, err => {
        console.log("Err");
      }
    )
  }

  setDOB(ev: any): void {
    const date: any = this.datePipe.transform(ev?.value, 'yyyy-MM-dd');
    this.appointmentDate = date;
  }

  createAppointment(): void {
    const body = {
      patientId: this.customer?.patientId,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
      meridiem: this.meridiem,
      doctor: this.doctor.find((item: Doctor) => item?.doctorId.toString() === this.doctorId.toString())
    };

    this.hService.createAppointment(this.doctorId, this.customer?.patientId, body).pipe(take(1)).subscribe((res) => {
      alert("Appointment created successfully");
      if (!!res && res?.appointmentId) {
        this.router.navigate(['/patient/my-appointment']);
      }
    }, error => {
       alert("Error occured while create appointment");
     })
  }
*/
appointmentForm: FormGroup;
customer: any = {};
doctor: Doctor[] = [];
startDate: Date | undefined;

constructor(
  private fb: FormBuilder,
  private hService: HospitalService,
  private datePipe: DatePipe,
  private router: Router
) {
  this.appointmentForm = this.fb.group({
    appointmentDate: ['', Validators.required],
    appointmentTime: ['', Validators.required],
    meridiem: ['am', Validators.required],
    doctorId: [0, Validators.required]
  });
}

ngOnInit(): void {
  this.startDate = new Date();
  this.getCustomerDetail();
  this.getDoctorList();
}

getCustomerDetail(): void {
  const cid = this.hService.getClientAuthorization();
  this.hService.getCustomerById(cid).pipe(take(1)).subscribe(
    (res: any) => {
      if (!!res && res?.patientId) {
        this.customer = res;
      }
    }, err => {
      console.log("Error fetching customer details");
    }
  );
}

getDoctorList(): void {
  this.hService.getDoctorList().pipe(take(1)).subscribe(
    (res: Doctor[]) => {
      if (!!res && Array.isArray(res) && res.length > 0) {
        this.doctor = res;
        this.appointmentForm.patchValue({ doctorId: res[0]?.doctorId });
      }
    }, err => {
      console.log("Error fetching doctor list");
    }
  );
}

setDOB(ev: any): void {
  const date: any = this.datePipe.transform(ev?.value, 'yyyy-MM-dd');
  this.appointmentForm.patchValue({ appointmentDate: date });
}

createAppointment(): void {
  if (this.appointmentForm.invalid) {
    alert("Please fill in all required fields.");
    return;
  }

  const body = {
    patientId: this.customer?.patientId,
    appointmentDate: this.appointmentForm.value.appointmentDate,
    appointmentTime: this.appointmentForm.value.appointmentTime,
    meridiem: this.appointmentForm.value.meridiem,
    doctor: this.doctor.find((item: Doctor) => item?.doctorId.toString() === this.appointmentForm.value.doctorId.toString())
  };

  this.hService.createAppointment(this.appointmentForm.value.doctorId, this.customer?.patientId, body).pipe(take(1)).subscribe((res) => {
    alert("Appointment created successfully");
    if (!!res && res?.appointmentId) {
      this.router.navigate(['/patient/my-appointment']);
    }
  }, error => {
    alert("Error occurred while creating appointment");
  });
}
}
