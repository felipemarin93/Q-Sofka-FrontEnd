import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloAspiranteComponent } from './modulo-aspirante.component';

describe('ModuloAspiranteComponent', () => {
  let component: ModuloAspiranteComponent;
  let fixture: ComponentFixture<ModuloAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloAspiranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
