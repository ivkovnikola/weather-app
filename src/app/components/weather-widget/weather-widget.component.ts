import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/service/weather.service';
import { map, filter, concatMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WeatherForecast } from 'src/app/model/weather-forecast';
import { colors, dayNames, monthNames } from 'src/app/utils/common';

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
  averageTemperature = 0;

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
    futureDay.setDate(futureDay.getDate() + 10);
    if (today.getMonth() === futureDay.getMonth()) {
      return (
        monthNames[today.getMonth()] +
        ' ' +
        today.getDate() +
        ' - ' +
        futureDay.getDate()
      );
    } else {
      return (
        monthNames[today.getMonth()] +
        ' ' +
        today.getDate() +
        ' - ' +
        monthNames[futureDay.getMonth()] +
        ' ' +
        futureDay.getDate()
      );
    }
  }

  getAverageTemperature(value: WeatherForecast): void {
    let sum = 0;
    for (let i = 0; i < 7; i++) {
      sum += value.data[i].temp;
    }
    const calculated = parseInt(sum / 7);
    this.averageTemperature = calculated;
    this.changeBackground(calculated);
  }

  getDayOfWeek(value: number): string {
    return dayNames[value];
  }

  changeBackground(value: number): void {
    if (value > 40) {
      value = 40;
    }
    if (value < -40) {
      value = -40;
    }
    const index = Math.round(value / 10) + 4;

    document.getElementById(
      'color-container'
    )?.style.backgroud = this.calculateGradient(index);
  }

  calculateGradient(index: number): string {
    let startIndex, middleIndex;
    if (index === 8 || index === 0) {
      return colors[index];
    } else if (index === 1) {
      startIndex = 0;
      middleIndex = 1;
    } else {
      startIndex = index - 2;
      middleIndex = index - 1;
    }
    return `linear-gradient(130.54deg, ${colors[startIndex]} -33.02%, ${colors[middleIndex]} 52.01%, ${colors[index]} 137.04%);`;
  }
}
