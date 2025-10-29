import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPivotTableUiComponent } from './pivot-table-ui.component';

describe('NgPivotTableUiComponent', () => {
  let component: NgPivotTableUiComponent;
  let fixture: ComponentFixture<NgPivotTableUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPivotTableUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgPivotTableUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
