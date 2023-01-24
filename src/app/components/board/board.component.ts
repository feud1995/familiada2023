import { Component, OnInit } from '@angular/core';
import { isEqual } from 'lodash-es';
import { BehaviorSubject, distinctUntilChanged, interval, map, Observable, timer } from 'rxjs';
import { GameAnswer, GameQuestion, GameQuestionSet, GameStore } from 'src/app/store';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  title: string = "Familiada";
  answers = [];

  localStoragePooling = interval(250).pipe(
    map(() => JSON.parse(localStorage.getItem('store') as string) as GameStore),
    distinctUntilChanged((prev, next) => isEqual(prev, next))
  );

  selectedQuestionSet$: Observable<Array<GameAnswer> | []> = this.localStoragePooling.pipe(
    map((store) => {
      const questionIndex = store.currentQuestionIndex;

      if(store.selectedSetIndex !== -1 && questionIndex !== -1) {
        return store.questionsSets[store.selectedSetIndex].questions[questionIndex].answers;
      }
      return [];
    }),
  )


  constructor() { }

  
}
