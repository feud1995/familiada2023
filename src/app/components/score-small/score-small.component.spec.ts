import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSmallComponent } from './score-small.component';

describe('ScoreSmallComponent', () => {
  let component: ScoreSmallComponent;
  let fixture: ComponentFixture<ScoreSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreSmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
