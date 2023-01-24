import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, map, timer } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  title: string = "Familiada";
  answers = ["MALUTKIE", "Mu", "JEST", "SMOLUTKE", "MLEMI", "... ..."];
  localStoragePooling = interval(250).pipe(
    map(() => localStorage.getItem('hello'))
  );
  
  constructor() {
    this.test();
  }

  test() {
    this.title = localStorage.getItem("hello") || 'test';
  }

  yo() {
    localStorage.setItem("hello", Math.random().toString());
    this.test();
  }
}
