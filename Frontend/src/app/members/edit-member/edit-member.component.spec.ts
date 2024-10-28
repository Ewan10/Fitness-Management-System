import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberComponent } from './edit-member.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditMemberComponent', () => {
  let component: EditMemberComponent;
  let fixture: ComponentFixture<EditMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMemberComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(EditMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
