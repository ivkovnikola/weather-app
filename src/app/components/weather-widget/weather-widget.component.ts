import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/service/weather.service';
import { map, filter, concatMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WeatherForecast } from 'src/app/model/weather-forecast';
import { monthNames } from 'src/app/utils/common';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  data$: Observable<WeatherForecast>;
  loading = false;
  dateRange: string;
  tempValues: WeatherForecast;
  averageTemperature: number;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.data$ = this.route.params.pipe(
      map((params) => params.locationName),
      filter((name) => !!name),
      tap(() => {
        this.loading = true;
      }),
      concatMap((name) => this.weatherService.getWeatherForCity(name)),
      tap(() => {
        this.loading = false;
      })
    );

    this.dateRange = this.getDateRange();

    this.data$.subscribe((val) => this.getAverageTemperature(val));
  }

  getDateRange(): string {
    const today: Date = new Date();
    const futureDay: Date = new Date();
    futureDay.setDate(futureDay.getDate() + 7);
    if (today.getMonth() === futureDay.getMonth()) {
      return (
        monthNames[today.getMonth()] +
        today.getDate() +
        ' - ' +
        futureDay.getDate()
      );
    } else {
      return (
        monthNames[today.getMonth()] +
        today.getDate() +
        ' - ' +
        monthNames[futureDay.getMonth()] +
        futureDay.getDate()
      );
    }
  }

  getAverageTemperature(value: WeatherForecast) {
    let sum = 0;
    for (let i = 0; i < 7; i++) {
      sum += value.data[i].temp;
    }
    this.averageTemperature = parseInt(sum / 7);
  }
}
