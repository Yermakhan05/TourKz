import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;
  let profileService: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    const profileSpy = jasmine.createSpyObj('ProfileService', ['getCurrentUser', 'uploadAvatarBase64'], {
      profile$: () => of({ avatarBase64: 'test' })
    });
    profileSpy.getCurrentUser.and.returnValue(Promise.resolve({ uid: '123' }));

    await TestBed.configureTestingModule({
      imports: [
        Profile,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ProfileService, useValue: profileSpy },
        { provide: AuthService, useValue: { user$: of({ uid: '123', email: 'test@test.com' }) } },
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have user$ observable', () => {
    expect(component.user$).toBeDefined();
  });

  it('should have profile$ observable', () => {
    expect(component.profile$).toBeDefined();
  });

  it('should handle file selection', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as any;

    profileService.uploadAvatarBase64.and.returnValue(Promise.resolve('base64string'));

    await component.selectFile(event);

    expect(profileService.getCurrentUser).toHaveBeenCalled();
  });

  it('should not process file if size exceeds limit', async () => {
    const largeFile = new File(['x'.repeat(40000)], 'large.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [largeFile] } } as any;

    spyOn(window, 'alert');

    await component.selectFile(event);

    expect(profileService.uploadAvatarBase64).not.toHaveBeenCalled();
  });
});

