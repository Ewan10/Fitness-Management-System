import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member, MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  constructor(private membersService: MembersService) { }

  editForm: FormGroup;
  member: Member;
  responseMessage: string;

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'age': new FormControl(null, [Validators.required, this.validateAge.bind(this)]),
      'address': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'classes': new FormControl(null, Validators.required)
    });
    this.membersService.editMember
      .subscribe((member) => {
        this.member = member;
        this.editForm.setValue({
          'name': this.member.name,
          'age': this.member.age,
          'address': this.member.address,
          'phone': this.member.phone,
          'classes': this.member.classes
        });
      })
  }

  validateAge(age: FormControl): { [s: string]: boolean } {
    if (age.value < 16)
      return { 'Age beyond range': true };
  }

  onEdit() {
    const member = {
      _id: this.member._id,
      name: this.editForm.value.name,
      age: this.editForm.value.age,
      address: this.editForm.value.address,
      phone: this.editForm.value.phone,
      classes: this.editForm.value.classes.slice(),
      __v: this.member.__v
    };
    this.membersService.edit(member)
      .subscribe((response: any) => {
        this.responseMessage = response?.message;
      },
        (error) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          }
          else {
            this.responseMessage = "Member record not available. An unexpected error occured.";
          }
        });
    const updateMembers = true;
    setTimeout(() => {
      this.membersService.updateMembersTable.emit(updateMembers);
    }, 50)
  }

  onReset() {
    this.editForm.reset();
  }
}
