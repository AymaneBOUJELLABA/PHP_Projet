import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatedDemandsComponent } from './treated-demands.component';

describe('TreatedDemandsComponent', () => {
  let component: TreatedDemandsComponent;
  let fixture: ComponentFixture<TreatedDemandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatedDemandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatedDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
