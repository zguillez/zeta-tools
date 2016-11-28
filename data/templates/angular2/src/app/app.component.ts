import { Component } from '@angular/core';
import '../styles/global.scss';
@Component({
  selector : 'app-container',
  template : require('./app.component.pug'),
  styles   : [require('./app.component.scss')],
})
export class AppComponent {
  name = "a2";

  constructor() {
    this.name = 'Angular2'
  }
}
