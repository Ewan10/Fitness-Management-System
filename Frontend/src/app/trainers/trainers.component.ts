import { Component } from '@angular/core';
import { Trainer, TrainersService } from '../services/trainers.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent {
  constructor(private trainersService: TrainersService) { }
  ngOnInit(): void {
    this.onViewTrainers();

    this.trainersService.updateTrainersTable
      .subscribe((updateTrainers) => {
        this.trainersUpdate = updateTrainers;
        if (this.trainersUpdate) {
          this.onViewTrainers();
        }
        this.trainersUpdate = false;
      })
  }

  trainersUpdate;
  trainers: Trainer[] = [];
  trainer: Trainer;
  responseMessage: String;

  onViewTrainers() {
    this.trainersService.viewAll()
      .subscribe((response: any) => {
        this.responseMessage = response?.message;
        this.trainers = response[1].trainers;
      },
        (error) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          }
          else {
            this.responseMessage = "Trainers record not available. An unexpected error occured.";
          }
        });
  }

  onEdit($event) {
    this.trainersService.getTrainer($event)
      .subscribe((response: any) => {
        this.trainer = response.data.trainer;
        this.trainersService.editTrainer.emit(this.trainer);
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
    if (window.confirm("Are you sure you want to delete this trainer?")) {
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
      this.trainersService.delete($event)
        .subscribe((response: any) => {
          this.responseMessage = response?.message;
          this.onViewTrainers();
        });
    }
  }

}
