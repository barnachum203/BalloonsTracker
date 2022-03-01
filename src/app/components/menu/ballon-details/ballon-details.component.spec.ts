import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallonDetailsComponent } from './ballon-details.component';

describe('BallonDetailsComponent', () => {
  let component: BallonDetailsComponent;
  let fixture: ComponentFixture<BallonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallonDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
