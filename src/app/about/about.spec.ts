import { ComponentFixture, TestBed } from '@angular/core/testing';
import { About } from './about';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        About,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentIndex).toBe(0);
    expect(component.images.length).toBe(3);
    expect(component.title).toBe('Why Us?');
  });

  it('should change image', () => {
    const initialIndex = component.currentIndex;
    component.changeImage();
    expect(component.currentIndex).toBe((initialIndex + 1) % component.images.length);
  });

  it('should cycle through images', () => {
    component.currentIndex = 2;
    component.changeImage();
    expect(component.currentIndex).toBe(0);
  });

  it('should clean up interval on destroy', () => {
    spyOn(window, 'clearInterval');
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalled();
  });
});

