import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueTeamDialogComponent } from './league-team-dialog.component';

describe('LeagueTeamDialogComponent', () => {
  let component: LeagueTeamDialogComponent;
  let fixture: ComponentFixture<LeagueTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueTeamDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeagueTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
