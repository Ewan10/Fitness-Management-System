import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTrainerComponent } from './register-trainer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainersService } from 'src/app/services/trainers.service';

describe('RegisterTrainerComponent', () => {
  let component: RegisterTrainerComponent;
  let fixture: ComponentFixture<RegisterTrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTrainerComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [TrainersService]
    });
    fixture = TestBed.createComponent(RegisterTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
