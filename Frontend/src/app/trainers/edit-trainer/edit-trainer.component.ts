import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trainer, TrainersService } from 'src/app/services/trainers.service';

@Component({
  selector: 'app-edit-trainer',
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent implements OnInit {
  constructor(private trainersService: TrainersService) { }

  editForm: FormGroup;
  trainer: Trainer;
  responseMessage: string;

  ngOnInit(): void {
    this.editForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'class': new FormControl(null, Validators.required)
    });
    this.trainersService.editTrainer
      .subscribe((trainer) => {
        this.trainer = trainer;
        this.editForm.setValue({
          'name': this.trainer.name,
          'phone': this.trainer.phone,
          'address': this.trainer.address,
          'email': this.trainer.email,
          'class': this.trainer.class
        });
      })
  }

  onEdit() {
    const trainer = {
      _id: this.trainer._id,
      name: this.editForm.value.name,
      phone: this.editForm.value.phone,
      address: this.editForm.value.address,
      email: this.editForm.value.email,
      class: this.editForm.value.class.slice(),
      __v: this.trainer.__v
    };
    this.trainersService.edit(trainer)
      .subscribe((response: any) => {
        this.responseMessage = response?.message;
      },
        (error) => {
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          }
          else {
            this.responseMessage = "Trainers record not available. An unexpected error occured.";
          }
        });
    const updateTrainers = true;
    setTimeout(() => {
      this.trainersService.updateTrainersTable.emit(updateTrainers);
    }, 50)
  }

  onReset() {
    this.editForm.reset();
  }

}
