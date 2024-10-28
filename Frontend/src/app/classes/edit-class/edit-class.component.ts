import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Class, ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  constructor(private classesService: ClassesService,
    private formBuilder: FormBuilder) { }

  editForm: FormGroup;
  schedule = new FormArray([]);
  _class: Class;
  responseMessage: string;

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'className': new FormControl(null, Validators.required),
      'trainer': new FormControl(null, Validators.required),
      'room': new FormControl(null, Validators.required),
      'numberOfMembers': new FormControl(null, Validators.required),
      'schedule': this.schedule
    });
    this.classesService.edit
      .subscribe((_class) => {
        this._class = _class;
        this.editForm.setValue({
          'className': this._class.name,
          'trainer': this._class.trainer,
          'room': this._class.room,
          'numberOfMembers': this._class.numberOfMembers,
          'schedule': this.initializeSessions(_class.schedule),
        })
      });
  }

  initializeSessions(array) {
    let intermediate = [];
    let schedule = [];

    for (const session in array) {
      intermediate.push(array[session].session.split(" "));
    }

    for (const sess in intermediate) {
      let times = [];
      let session = {
        'day': null,
        'startingTime': null,
        'endingTime': null
      };

      session.day = intermediate[sess][0];
      times.push(intermediate[sess][1].split("-"));
      session.startingTime = times[0][0];
      session.endingTime = times[0][1];
      schedule.push(session);
    }
    for (const session in schedule) {
      this.schedule.push(
        new FormGroup({
          'day': new FormControl(schedule[session].day, Validators.required),
          'startingTime': new FormControl(schedule[session].startingTime, Validators.required),
          'endingTime': new FormControl(schedule[session].endingTime, Validators.required),
        })
      )
    }
    return this.schedule;
  }

  getSessions() {
    return (<FormArray>this.editForm.get('schedule')).controls;
  }

  onAddSession() {
    const newSession = new FormGroup({
      'day': new FormControl(null, Validators.required),
      'startingTime': new FormControl(null, Validators.required),
      'endingTime': new FormControl(null, Validators.required)
    });
    (<FormArray>this.editForm.get('schedule')).push(newSession);
  }

  onRemoveSession(index: number) {
    (<FormArray>this.editForm.get('schedule')).removeAt(index);
  }

  onEdit() {
    const schedule = this.editForm.value.schedule.slice();
    const _class = {
      _id: this._class._id,
      className: this.editForm.value.className,
      trainer: this.editForm.value.trainer,
      room: this.editForm.value.room,
      numberOfMembers: this.editForm.value.numberOfMembers,
      schedule: this.classesService.sessionsToStrings(schedule),
    };
    this.classesService.editClass(_class)
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
        }
      );
    this.onReset();
    const updateClasses = true;
    setTimeout(() => {
      this.classesService.updateClassesTable.emit(updateClasses);
    }, 50)
  }

  onReset() {
    this.editForm.reset();
    (<FormArray>this.editForm.get('schedule')).controls = [];
  }

}
