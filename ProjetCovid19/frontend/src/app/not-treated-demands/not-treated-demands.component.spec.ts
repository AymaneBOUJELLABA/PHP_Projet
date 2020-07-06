import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotTreatedDemandsComponent } from './not-treated-demands.component';

describe('NotTreatedDemandsComponent', () => {
  let component: NotTreatedDemandsComponent;
  let fixture: ComponentFixture<NotTreatedDemandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotTreatedDemandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotTreatedDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
