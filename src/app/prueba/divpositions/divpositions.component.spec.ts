import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DivpositionsComponent } from './divpositions.component';

describe('DivpositionsComponent', () => {
  let component: DivpositionsComponent;
  let fixture: ComponentFixture<DivpositionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DivpositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivpositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
