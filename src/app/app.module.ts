import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CelsiusDisplayComponent } from './components/celsius-display/celsius-display.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherWidgetComponent,
  },
  {
    path: ':locationName',
    component: WeatherWidgetComponent,
  },
];
@NgModule({
  declarations: [AppComponent, WeatherWidgetComponent, CelsiusDisplayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
