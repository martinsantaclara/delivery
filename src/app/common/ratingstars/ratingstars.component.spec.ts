import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RatingstarsComponent } from './ratingstars.component';

describe('RatingstarsComponent', () => {
  let component: RatingstarsComponent;
  let fixture: ComponentFixture<RatingstarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingstarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingstarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
