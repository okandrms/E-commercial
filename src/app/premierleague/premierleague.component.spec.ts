import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremierleagueComponent } from './premierleague.component';

describe('PremierleagueComponent', () => {
  let component: PremierleagueComponent;
  let fixture: ComponentFixture<PremierleagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremierleagueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremierleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
