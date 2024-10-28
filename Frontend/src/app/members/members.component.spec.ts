import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterMemberComponent } from './register-member/register-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent,
        RegisterMemberComponent,
        EditMemberComponent
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
