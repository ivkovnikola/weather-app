import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  city: string;

  onBlurMethod() {
    this.router.navigate([this.city]);
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
