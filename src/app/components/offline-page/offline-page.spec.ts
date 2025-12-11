import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfflinePageComponent } from './offline-page';
import { RouterTestingModule } from '@angular/router/testing';
import { OfflineService } from '../../services/offline.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('OfflinePageComponent', () => {
  let component: OfflinePageComponent;
  let fixture: ComponentFixture<OfflinePageComponent>;
  let offlineService: jasmine.SpyObj<OfflineService>;

  beforeEach(async () => {
    const offlineSpy = jasmine.createSpyObj('OfflineService', ['checkConnection'], {
      online$: of(false)
    });

    await TestBed.configureTestingModule({
      imports: [
        OfflinePageComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: OfflineService, useValue: offlineSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OfflinePageComponent);
    component = fixture.componentInstance;
    offlineService = TestBed.inject(OfflineService) as jasmine.SpyObj<OfflineService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with offline status', () => {
    expect(component.isOnline).toBe(false);
  });

  it('should have checkConnection method', () => {
    expect(typeof component.checkConnection).toBe('function');
  });

  it('should have goToCachedContent method', () => {
    expect(typeof component.goToCachedContent).toBe('function');
  });

  it('should increment retry count on checkConnection', () => {
    const initialCount = component.retryCount;
    component.checkConnection();
    expect(component.retryCount).toBe(initialCount + 1);
  });
});

