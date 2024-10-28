import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Class, ClassesService } from './classes.service';

describe('Classes Service Test', () => {
  let service: ClassesService;
  let httpTestingController: HttpTestingController;
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;
  // let classesService: ClassesService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClassesService]
    });
    service = TestBed.inject(ClassesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    //   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'patch']);
    //   classesService = new ClassesService(httpClientSpy);
  });

  afterEach(() => {
    httpTestingController.verify();
  });



  // describe('viewAll()', () => {
  //   it('Should return expected classes when viewAll is called', (done: DoneFn) => {
  //     httpClientSpy.get.and.returnValue(of(CLASSES));
  //     classesService.viewAll().subscribe({
  //       next: (classes) => {
  //         expect(classes).toEqual(CLASSES);
  //         done();
  //       },
  //       error: () => {
  //         done.fail;
  //       },
  //     });
  //     expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  //   })
  // })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
