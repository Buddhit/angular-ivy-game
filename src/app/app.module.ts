import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CountryCapitalComponent } from './game/CountryCapital';

@NgModule({
  imports: [BrowserModule, PickerModule, FormsModule],
  declarations: [AppComponent, HelloComponent, CountryCapitalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
