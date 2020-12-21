import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from './model/countries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  countries: Country[] = [
    { value: 'DE', viewValue: 'DE' },
    { value: 'RS', viewValue: 'RS' },
  ];

  city: string;
  selectedCountry = this.countries[0];

  onBlurMethod() {
    this.router.navigate([this.city]);
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
