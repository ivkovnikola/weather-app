import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-celsius-display',
  templateUrl: './celsius-display.component.html',
  styleUrls: ['./celsius-display.component.scss'],
})
export class CelsiusDisplayComponent implements OnInit {
  @Input() temperature: number;
  @Input() day: string;
  @Input() bigWidget?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
