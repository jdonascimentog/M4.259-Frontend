import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroPortadaComponent } from './centro-portada.component';

describe('CentroPortadaComponent', () => {
  let component: CentroPortadaComponent;
  let fixture: ComponentFixture<CentroPortadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentroPortadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroPortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
