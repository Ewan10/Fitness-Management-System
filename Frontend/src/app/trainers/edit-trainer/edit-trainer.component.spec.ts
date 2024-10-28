import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainersService } from 'src/app/services/trainers.service';
import { EditTrainerComponent } from './edit-trainer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditTrainerComponent', () => {
  let component: EditTrainerComponent;
  let fixture: ComponentFixture<EditTrainerComponent>;
  let trainersService: TrainersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTrainerComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [TrainersService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrainerComponent);
    component = fixture.componentInstance;
    trainersService = TestBed.inject(TrainersService);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to editTrainer', () => {
    const trainer = {
      _id: '1',
      name: 'John Doe',
      phone: '123456789',
      address: '123 Street',
      email: 'john@example.com',
      class: 'Yoga',
      __v: 0
    };

    trainersService.editTrainer.emit(trainer);
    expect(component.trainer).toEqual(trainer);
  });
});
