import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPivottableComponent } from './angular-pivottable.component';

describe('AngularPivottableComponent', () => {
  let component: AngularPivottableComponent;
  let fixture: ComponentFixture<AngularPivottableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularPivottableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularPivottableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
