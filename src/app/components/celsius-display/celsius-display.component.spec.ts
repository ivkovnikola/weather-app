import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelsiusDisplayComponent } from './celsius-display.component';

describe('CelsiusDisplayComponent', () => {
  let component: CelsiusDisplayComponent;
  let fixture: ComponentFixture<CelsiusDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelsiusDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CelsiusDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
