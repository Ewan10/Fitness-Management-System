import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMemberComponent } from './register-member.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterMemberComponent', () => {
  let component: RegisterMemberComponent;
  let fixture: ComponentFixture<RegisterMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMemberComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(RegisterMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
