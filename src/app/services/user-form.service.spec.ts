import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserFormService } from './user-form.service';

describe('UserFormService', () => {
  let service: UserFormService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserFormService]
    });
    service = TestBed.inject(UserFormService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit form data', () => {
    const formData = {
      name: 'Test User',
      email: 'test@test.com',
      phone: '+1234567890',
      comment: 'Test comment',
      status: 'pending'
    };
    const mockResponse = { message: 'Form submitted successfully' };

    service.submitForm(formData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/api/forms/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
    req.flush(mockResponse);
  });
});

