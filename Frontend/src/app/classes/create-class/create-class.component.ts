import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Class, ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent {
  constructor(private classesService: ClassesService) { }

  status: string;
  classForm: FormGroup;
  _class: Class;
  edit = false;

  session = new FormGroup({
    'day': new FormControl(null, Validators.required),
    'startingTime': new FormControl(null, Validators.required),
    'endingTime': new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.classForm = new FormGroup({
      'className': new FormControl(null, Validators.required),
      'trainer': new FormControl(null, Validators.required),
      'room': new FormControl(null, Validators.required),
      'membersNo': new FormControl(null, Validators.required),
      'schedule': new FormArray([this.session])
    });
  }

  getSessions() {
    return (<FormArray>this.classForm.get('schedule')).controls;
  }

  onAddSession() {
    const newSession = new FormGroup({
      'day': new FormControl(null, Validators.required),
      'startingTime': new FormControl(null, Validators.required),
      'endingTime': new FormControl(null, Validators.required)
    });
    (<FormArray>this.classForm.get('schedule')).push(newSession);
  }

  onRemoveSession(index: number) {
    (<FormArray>this.classForm.get('schedule')).removeAt(index);
  }

  onSubmit() {
    const schedule = this.classForm.value.schedule.slice();

    const _class = {
      name: this.classForm.value.className,
      trainer: this.classForm.value.trainer,
      room: this.classForm.value.room,
      numberOfMembers: this.classForm.value.membersNo,
      schedule: this.classesService.sessionsToStrings(schedule),
    };
    this.classesService.createClass(_class)
      .subscribe((response: any) => {
        this.status = response?.message;
        this._class = response[1]._class;
        console.log(this._class);
      },
        (error) => {
          if (error.error?.message) {
            this.status = error.error?.message;
          }
          else {
            this.status = "Creating class failed due to unknown error.";
          }
        }
      );
    this.classForm.reset();
    const updateClasses = true;
    setTimeout(() => {
      this.classesService.updateClassesTable.emit(updateClasses);
    }, 30);

    // for (const session in _class.schedule) {
    //   console.log(_class.schedule[session]);
    // }
    // console.log(_class.schedule);
    // const session = (<FormArray>this.classForm.get('schedule')).value.pop();

    // for (const field in session) {
    //   console.log(session[field]);
    // }

  }

  onReset() {
    this.classForm.reset();
  }

}
