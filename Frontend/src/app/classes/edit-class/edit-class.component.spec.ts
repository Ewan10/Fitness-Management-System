import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditClassComponent } from './edit-class.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { Class, ClassesService } from 'src/app/services/classes.service';
import { of } from 'rxjs';

describe('EditClassComponent', () => {
  let component: EditClassComponent;
  let fixture: ComponentFixture<EditClassComponent>;
  let classesService: ClassesService;
  let editEmitter: EventEmitter<Class>;

  beforeEach(() => {
    editEmitter = new EventEmitter<Class>();
    TestBed.configureTestingModule({
      declarations: [EditClassComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [

        {
          provide: ClassesService,
          useValue: {
            edit: editEmitter,
            getClass: jasmine.createSpy('getClass').and.returnValue(of({ data: { _class: {} } })),
            editClass: jasmine.createSpy('editClass').and.returnValue(of({ message: 'Class updated' })),
            updateClassesTable: new EventEmitter<boolean>(),
            sessionsToStrings: jasmine.createSpy('sessionsToStrings').and.returnValue([]),
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClassComponent);
    component = fixture.componentInstance;
    classesService = TestBed.inject(ClassesService);
    spyOn(component, 'initializeSessions').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
