import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassComponent } from './create-class.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateClassComponent', () => {
  let component: CreateClassComponent;
  let fixture: ComponentFixture<CreateClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateClassComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(CreateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
