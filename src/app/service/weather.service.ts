import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { WeatherForecast } from '../model/weather-forecast';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  key = '4d2d2229dd5d48cf86a28bf7c20ac5ce';

  getWeatherForCity(value: string): Observable<any> {
    const parts = value.split('&');
    let path = '';
    if (parts.length > 1 && parts[0] != 'any') {
      path = `https://api.weatherbit.io/v2.0/forecast/daily?city=${parts[1]}&country=${parts[0]}&key=${this.key}`;
    } else {
      path = `https://api.weatherbit.io/v2.0/forecast/daily?city=${parts[1]}&key=${this.key}`;
    }
    return this.http.get<WeatherForecast>(path).pipe(
      map((data) => ({
        ...data,
      }))
    );
  }
}
