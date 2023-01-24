import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer: string = '';
  @Input() isShown = false;

  constructor() { }

  ngOnInit(): void { }

  get emptyAnswer() {
    return ['','','','','','','','','','','','','','','','','',''];
  }


  nbspize(value: string) {
    return value.replace(/ /g, "\u00a0\u00a0");
  }
}
