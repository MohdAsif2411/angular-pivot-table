import { Component } from '@angular/core';
import { NgPivotTableUiComponent } from 'angular-pivottable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [NgPivotTableUiComponent]
})
export class AppComponent {
  data = [
    ['attribute', 'value'],
    ['a', 1],
    ['b', 2]
  ];

  onConfigChange(cfg: any) {
    console.log('pivot config', cfg);
  }
}
