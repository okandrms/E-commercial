import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Euro2024Component } from './euro2024.component';

describe('Euro2024Component', () => {
  let component: Euro2024Component;
  let fixture: ComponentFixture<Euro2024Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Euro2024Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Euro2024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
