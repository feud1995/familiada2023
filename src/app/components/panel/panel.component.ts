import { Component, Input } from "@angular/core";
import { isEqual } from "lodash-es";
import { distinctUntilChanged, interval, map, Observable } from "rxjs";
import { GameAnswer, GameQuestion, GameQuestionSet, GameStore, store } from "src/app/store";
import produce from "immer"

@Component({
  selector: "panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"]
})
export class PanelComponent {
  localStoragePooling = interval(250).pipe(
    map(() => JSON.parse(localStorage.getItem('store') as string) as GameStore),
    distinctUntilChanged((prev, next) => isEqual(prev, next))
  );
  private audio = new Audio();


  constructor() { }

  get store(): GameStore {
    return JSON.parse(localStorage.getItem('store') as string) as GameStore;
  }

  set store(value) {
    localStorage.setItem('store', JSON.stringify(value));
  }

  resetGame() {
    localStorage.setItem('store', JSON.stringify(store));
  }

  hasNextQuestion() {
    if(this.store.currentQuestionIndex !== -1) {
      const currentQuestionIndex = this.store.currentQuestionIndex;
      return currentQuestionIndex < this.store.questionsSets[this.store.selectedSetIndex].questions.length - 1;  
    }
    return false;
  }

  selectedQuestion$: Observable<GameQuestion | undefined> = this.localStoragePooling.pipe(
    map((store) => {
      const questionIndex = store.currentQuestionIndex;

      if(store.selectedSetIndex !== -1 && questionIndex !== -1) {
        return store.questionsSets[store.selectedSetIndex].questions[questionIndex];
      }
      return undefined;
    }),
  )

  selectedQuestionSetAnswers$: Observable<Array<GameAnswer> | []> = this.selectedQuestion$.pipe(
    map((questions) => {
      if(questions !== undefined) {
        return questions.answers;
      }
      return [];
    }));

  uncoverAnswer(index: number) {
    setTimeout(() => {
      this.store = produce(this.store, draft => {
        const question = draft.questionsSets[draft.selectedSetIndex]
             .questions[draft.currentQuestionIndex]
             .answers[index];
        question.isAnswered = true;
        draft.scores.roundScore += question.value;
      })
    }, 250)
    this.play('good_answer.mp3');
  }

  chooseSet(index: number) {
    this.store = produce(this.store, draft => {
      draft.selectedSetIndex = index;
      draft.currentQuestionIndex = 0;
    });
  }

  givePointsToLeft() {
    this.store = produce(this.store, draft => {
      draft.scores.teamLeft += draft.scores.roundScore;
    })
  }

  givePointsToRight() {
    this.store = produce(this.store, draft => {
      draft.scores.teamRight += draft.scores.roundScore;
    })
  }

  nextQuestion() {
    if(this.hasNextQuestion()) {
      this.store = produce(this.store, draft => {
        draft.scores.roundScore = 0;
        draft.currentQuestionIndex += 1;
      })
    }
  }

  showMidError(side: 'Left' | 'Right', number: 1 | 2 | 3) {
    setTimeout(() => {
      this.store = {
        ... this.store,
        errors: {
          ... this.store.errors,
          [`team${side}${number}`]: true
        }
      }
    }, 250)
    this.play('bad_answer.mp3');
  }

  showBigError(side: 'Left' | 'Right') {
    setTimeout(() => {
      this.store = {
        ... this.store,
        errors: {
          ... this.store.errors,
          [`team${side}Big`]: true
        }
      }
    }, 250)
    this.play('bad_answer.mp3');
  }

  play(sound: 'good_answer.mp3' | 'bad_answer.mp3' | 'jingiel_start.mp3' | 'jingiel_duzy.mp3') {
    this.audio.src = `assets/${sound}`;
    this.audio.load();
    this.audio.play();
  }

  stop() {
    this.audio.pause();
  }
}
