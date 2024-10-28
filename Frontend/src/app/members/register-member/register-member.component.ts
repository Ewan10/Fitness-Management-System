import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Member, MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.css']
})
export class RegisterMemberComponent implements OnInit {
  constructor(private membersService: MembersService) { }

  responseMessage: string;
  memberForm: FormGroup;
  member: Member;
  edit = false;

  ngOnInit(): void {
    this.memberForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'age': new FormControl(null, [Validators.required, this.validateAge.bind(this)]),
      'address': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'classes': new FormControl(null, Validators.required)
    });
  }

  validateAge(age: FormControl): { [s: string]: boolean } {
    if (age.value < 16)
      return { 'Age beyond range': true };
  }

  onSubmit() {
    const member = {
      name: this.memberForm.value.name,
      age: this.memberForm.value.age,
      address: this.memberForm.value.address,
      phone: this.memberForm.value.phone,
      classes: this.memberForm.value.classes.slice(),
    };
    this.membersService.registerMember(member)
      .subscribe((response: any) => {
        this.responseMessage = response?.message;
      },
        (error) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          }
          else {
            this.responseMessage = "Update of details failed due to unknown error.";
          }
        }
      );
    console.log("member classes: ", member);
    this.memberForm.reset();
    const updateMembers = true;
    setTimeout(() => {
      this.membersService.updateMembersTable.emit(updateMembers);
    }, 30);
  }

  onReset() {
    this.memberForm.reset();
  }

}
