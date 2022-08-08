import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aspirante.ComponentComponent } from './aspirante.component.component';

describe('Aspirante.ComponentComponent', () => {
  let component: Aspirante.ComponentComponent;
  let fixture: ComponentFixture<Aspirante.ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Aspirante.ComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Aspirante.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
