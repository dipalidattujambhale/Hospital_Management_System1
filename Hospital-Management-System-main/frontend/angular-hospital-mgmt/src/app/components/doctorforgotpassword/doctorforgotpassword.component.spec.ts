import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorforgotpasswordComponent } from './doctorforgotpassword.component';

describe('DoctorforgotpasswordComponent', () => {
  let component: DoctorforgotpasswordComponent;
  let fixture: ComponentFixture<DoctorforgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorforgotpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
