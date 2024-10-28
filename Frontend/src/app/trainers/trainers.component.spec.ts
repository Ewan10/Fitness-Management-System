import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainersComponent } from './trainers.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterTrainerComponent } from './register-trainer/register-trainer.component';
import { TrainersService } from '../services/trainers.service';
import { EditTrainerComponent } from './edit-trainer/edit-trainer.component';
import { ReactiveFormsModule } from '@angular/forms';


describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;
  let trainersService: TrainersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TrainersComponent,
        RegisterTrainerComponent,
        EditTrainerComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [TrainersService]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    trainersService = TestBed.inject(TrainersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onViewTrainers on ngOnInit', () => {
    const spy = spyOn(component, 'onViewTrainers');
    component.ngOnInit();
    expect(component.onViewTrainers).toHaveBeenCalled();
  });

});
