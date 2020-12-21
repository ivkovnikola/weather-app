import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from './model/country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  countries: Country[] = [
    { value: 'any', viewValue: '-' },
    { value: 'de', viewValue: 'DE' },
    { value: 'nl', viewValue: 'NL' },
    { value: 'us', viewValue: 'US' },
    { value: 'fr', viewValue: 'FR' },
  ];

  city: string;
  selectedCountry = this.countries[0];

  onBlurMethod(): void {
    this.router.navigate([this.selectedCountry.value + '&' + this.city]);
  }

  countrySelected(): void {
    const container = document.getElementById('country-select');
    if (container) {
      container.style.background = `url(../assets/flags/${this.selectedCountry.value}.ico) no-repeat scroll 7px 7px`;
    }
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
