import { Component, OnInit } from '@angular/core';
import { Member, MembersService } from '../services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  constructor(private membersService: MembersService) { }
  ngOnInit(): void {
    this.onViewMembers();

    this.membersService.updateMembersTable
      .subscribe((updateMembers) => {
        this.membersUpdate = updateMembers;
        if (this.membersUpdate) {
          this.onViewMembers();
        }
        this.membersUpdate = false;
      })
  }

  membersUpdate;
  members: any;
  member: Member;
  responseMessage: String;
  delete = false;

  onViewMembers() {
    this.membersService.viewAll()
      .subscribe((response: any) => {
        this.responseMessage = response?.message;
        this.members = response;
      },
        (error) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          }
          else {
            this.responseMessage = "Members record not available. An unexpected error occured.";
          }
        });
  }

  onEdit($event) {
    this.membersService.getMember($event)
      .subscribe((response: any) => {
        this.member = response.data.member;
        this.membersService.editMember.emit(this.member);
      },
        (error) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          }
          else {
            this.responseMessage = "Member record not available. An unexpected error occured.";
          }
        }
      );
  }

  onConfirm() {
    if (window.confirm("Are you sure you want to delete this member?")) {
      return true;
    }
    else {
      return false;
    }
  }

  onDelete($event) {
    if (!this.onConfirm()) {
      return;
    }
    else {
      this.membersService.delete($event)
        .subscribe((response: any) => {
          this.responseMessage = response?.message;
          this.onViewMembers();
          this.delete = true;
          setTimeout(() => {
            this.delete = false;
          }, 1500);

        });
    }
  }

}
