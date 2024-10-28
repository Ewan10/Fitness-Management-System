import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ClassesComponent } from './classes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateClassComponent } from './create-class/create-class.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassesService, Class } from '../services/classes.service';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('Http Testing Module for Classes', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;
  let classesService: ClassesService;
  let updateClassesTableEmitter: EventEmitter<boolean>;
  let getClassSpy: jasmine.Spy;
  let classNative: { [key: string]: Class } = null;
  // let CLASSES: Class[] = [
  //   {
  //     _id: '******************',
  //     name: 'Aerobics',
  //     trainer: 'Joao Batista',
  //     room: 101,
  //     numberOfMembers: 4,
  //     schedule: ['Monday 12:05-13:45'],
  //     __v: 1
  //   }
  // ];
  let class_1: { [key: string]: Class };

  beforeEach(() => {
    updateClassesTableEmitter = new EventEmitter<boolean>;
    TestBed.configureTestingModule({
      declarations: [ClassesComponent,
        CreateClassComponent,
        EditClassComponent
      ],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ClassesService
          // ,
          // useValue: {
          //   viewAll: jasmine.createSpy('viewAll').and.returnValue(of([])),
          //   updateClassesTable: updateClassesTableEmitter,
          //   getClass: jasmine.createSpy('getClass').and.returnValue(of({ data: { _class: {} } })),
          //   delete: jasmine.createSpy('delete').and.returnValue(of({ message: 'Deleted' }))
          // }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    classesService = TestBed.inject(ClassesService);

    // getClassSpy = spyOn(classesService, 'getClass').and.returnValue(of(class_1));

    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    spyOn(component, 'onViewClasses').and.callThrough();
    classNative = class_1;
    fixture.detectChanges();
  });

  it('should call onViewClasses on initialization', () => {
    // component.ngOnInit();
    expect(component.onViewClasses).toHaveBeenCalled();
  });

  it('should create classes component', () => {
    expect(component).toBeTruthy();
  });

  it('should not get the class after component initialized', () => {
    fixture.detectChanges();
    expect(classNative).toBeUndefined();
  })

  it('should get the class object after getClass called', fakeAsync(() => {
    expect(classNative).toBe(class_1);
  }))

});
