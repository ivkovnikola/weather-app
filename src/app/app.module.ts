import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CelsiusDisplayComponent } from './components/celsius-display/celsius-display.component';
import { HttpErrorInterceptor } from './service/http-error,interceptors';

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
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
