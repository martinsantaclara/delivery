import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Favoritos1Component } from './favoritos1.component';

describe('Favoritos1Component', () => {
  let component: Favoritos1Component;
  let fixture: ComponentFixture<Favoritos1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Favoritos1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Favoritos1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
