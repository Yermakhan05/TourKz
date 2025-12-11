import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';
import { UserFormService } from '../services/user-form.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let userFormService: jasmine.SpyObj<UserFormService>;

  beforeEach(async () => {
    const formServiceSpy = jasmine.createSpyObj('UserFormService', ['submitForm']);

    await TestBed.configureTestingModule({
      imports: [
        ContactsComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: UserFormService, useValue: formServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    userFormService = TestBed.inject(UserFormService) as jasmine.SpyObj<UserFormService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form data', () => {
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.phone).toBe('');
    expect(component.comment).toBe('');
  });

  it('should call submitForm when form is valid', () => {
    userFormService.submitForm.and.returnValue(of({ message: 'Success' }));
    component.name = 'Test';
    component.email = 'test@test.com';
    component.phone = '1234567890';

    const form = { valid: true } as any;
    component.submitForm(form);

    expect(userFormService.submitForm).toHaveBeenCalled();
  });

  it('should not submit when form is invalid', () => {
    const form = { valid: false } as any;
    component.submitForm(form);

    expect(userFormService.submitForm).not.toHaveBeenCalled();
  });
});

