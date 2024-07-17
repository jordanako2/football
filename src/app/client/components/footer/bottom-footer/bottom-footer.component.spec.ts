import { ComponentFixture, TestBed } from '@angular/core/testing';

import {BottomFooterComponent } from './bottom-footer.component';

describe('TopFooterComponent', () => {
  let component: BottomFooterComponent;
  let fixture: ComponentFixture<BottomFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
