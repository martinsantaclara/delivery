import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaproductosComponent } from './listaproductos.component';

describe('ListaproductosComponent', () => {
  let component: ListaproductosComponent;
  let fixture: ComponentFixture<ListaproductosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaproductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
