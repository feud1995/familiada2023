import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-small',
  templateUrl: './score-small.component.html',
  styleUrls: ['./score-small.component.scss']
})
export class ScoreSmallComponent implements OnInit {
  @Input() score = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
