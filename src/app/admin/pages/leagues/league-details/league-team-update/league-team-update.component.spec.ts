import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueTeamUpdateComponent } from './league-team-update.component';

describe('LeagueTeamUpdateComponent', () => {
  let component: LeagueTeamUpdateComponent;
  let fixture: ComponentFixture<LeagueTeamUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueTeamUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeagueTeamUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
