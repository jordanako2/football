import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturecontentComponent } from './featurecontent.component';

describe('FeaturecontentComponent', () => {
  let component: FeaturecontentComponent;
  let fixture: ComponentFixture<FeaturecontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturecontentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
