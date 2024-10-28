import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trainer, TrainersService } from 'src/app/services/trainers.service';

@Component({
  selector: 'app-register-trainer',
  templateUrl: './register-trainer.component.html',
  styleUrls: ['./register-trainer.component.css']
})
export class RegisterTrainerComponent implements OnInit {
  constructor(private trainersService: TrainersService) { }

  responseMessage: string;
  trainerForm: FormGroup;
  trainer: Trainer;
  edit = false;

  ngOnInit(): void {
    this.trainerForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'class': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const trainer = {
      name: this.trainerForm.value.name,
      phone: this.trainerForm.value.phone,
      address: this.trainerForm.value.address,
      email: this.trainerForm.value.email,
      class: this.trainerForm.value.class.slice(),
    };
    this.trainersService.registerTrainer(trainer)
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
    console.log("trainer classes: ", trainer);
    this.trainerForm.reset();
    const updateTrainers = true;
    setTimeout(() => {
      this.trainersService.updateTrainersTable.emit(updateTrainers);
    }, 30);
  }

  onReset() {
    this.trainerForm.reset();
  }
}
