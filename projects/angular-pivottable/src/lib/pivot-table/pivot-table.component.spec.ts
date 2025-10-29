import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPivotTableComponent } from './pivot-table.component';

describe('NgPivotTableComponent', () => {
  let component: NgPivotTableComponent;
  let fixture: ComponentFixture<NgPivotTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPivotTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgPivotTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
