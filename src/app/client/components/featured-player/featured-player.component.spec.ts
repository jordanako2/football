import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPlayerComponent } from './featured-player.component';

describe('FeaturedPlayerComponent', () => {
  let component: FeaturedPlayerComponent;
  let fixture: ComponentFixture<FeaturedPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
