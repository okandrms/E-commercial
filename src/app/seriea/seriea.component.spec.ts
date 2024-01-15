import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieaComponent } from './seriea.component';

describe('SerieaComponent', () => {
  let component: SerieaComponent;
  let fixture: ComponentFixture<SerieaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerieaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
