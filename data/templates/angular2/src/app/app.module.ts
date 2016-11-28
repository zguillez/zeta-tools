import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ButtonTimerComponent } from './components/example-base-component/button-timer.component';
@NgModule({
  imports      : [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations : [
    AppComponent,
    ButtonTimerComponent
  ],
  providers    : [],
  bootstrap    : [AppComponent]
})
export class AppModule {
}
