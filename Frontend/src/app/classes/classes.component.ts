import { Component, OnInit } from '@angular/core';
import { Class, ClassesService } from '../services/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  ngOnInit(): void {
    this.onViewClasses();

    this.classesService.updateClassesTable
      .subscribe((updateClasses) => {
        this.classesUpdate = updateClasses;
        if (this.classesUpdate) {
          this.onViewClasses();
        }
        this.classesUpdate = false;
      })
  }
  constructor(private classesService: ClassesService) { }

  classesUpdate;
  classes: any;
  _class: Class;
  responseMessage: String;

  onViewClasses() {
    this.classesService.viewAll()
      .subscribe((response: any) => {
        let status = '';
        for (const key in response[0]) {
          if (response[0].hasOwnProperty(key)) {
            status = status.concat(response[0][key]).slice();
          }
        }
        this.responseMessage = status;
        this.classes = response[1].classes;
      },
        (error) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          }
          else {
            this.responseMessage = "Classes record not available. An unexpected error occured.";
          }
        });
  }

  onEdit($event) {
    this.classesService.getClass($event)
      .subscribe((response: any) => {
        this._class = response.data._class;
        console.log("Class schedule: ", this._class.schedule)
        for (const session in this._class.schedule) {
          console.log(this._class.schedule[session])
        }
        this.classesService.edit.emit(this._class);
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
    if (window.confirm("Are you sure you want to delete this class?")) {
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
      this.classesService.delete($event)
        .subscribe((response: any) => {
          this.responseMessage = response?.message;
          this.onViewClasses();
        });
    }
  }

}
