import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallonDialogComponent } from './ballon-dialog.component';

describe('BallonDialogComponent', () => {
  let component: BallonDialogComponent;
  let fixture: ComponentFixture<BallonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
