import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Endereco } from './endereco';

describe('Endereco', () => {
  let component: Endereco;
  let fixture: ComponentFixture<Endereco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Endereco]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Endereco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
