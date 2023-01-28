import { Component, Input } from "@angular/core";
import { forEach, isEqual } from "lodash-es";
import { BehaviorSubject, distinctUntilChanged, interval, map, Observable, ReplaySubject, tap } from "rxjs";
import { GameAnswer, GameQuestion, GameQuestionSet, GameStore, store } from "src/app/store";
import produce from "immer"

@Component({
  selector: "panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"]
})
export class PanelComponent {
  previousState = {};
  localStoragePooling = interval(100).pipe(
    map(() => JSON.parse(localStorage.getItem('store') as string) as GameStore),
    distinctUntilChanged((prev, next) => isEqual(prev, next)),
   );
  isGameStarted$: Observable<boolean> = this.localStoragePooling.pipe(
    map((store) => store.selectedSetIndex !== -1)
  );
  lastSavedVersion = new BehaviorSubject(this.store);
  
  private audio = new Audio();

  constructor() { 
  }

  get store(): GameStore {
    return JSON.parse(localStorage.getItem('store') as string) as GameStore;
  }

  set store(value) {
    this.lastSavedVersion.next(this.store);
    localStorage.setItem('store', JSON.stringify(value));
  }

  resetGame() {
    const isSure = confirm("Chcesz zresetować?");
    if(isSure) {
      localStorage.setItem('store', JSON.stringify(store));
    }
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

  uncoverAnswer(index: number, noPoints = false) {
    this.store = produce(this.store, draft => {
      const question = draft.questionsSets[draft.selectedSetIndex]
            .questions[draft.currentQuestionIndex]
            .answers[index];
      question.isAnswered = true;
      draft.scores.roundScore += !noPoints ? question.value : 0;
    })
    this.play('good_answer.mp3');
  }

  chooseSet(index: number) {
    this.store = produce(this.store, draft => {
      draft.selectedSetIndex = index;
      draft.currentQuestionIndex = 0;
    });

    this.play('jingiel_start.mp3');
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

  clearErrors() {
    this.store = produce(this.store, draft => {
      draft.errors = store.errors;
    });
  }

  undoGame() {
    this.store = this.lastSavedVersion.value;
  }

  nextQuestion() {
    const isSure = confirm("Chcesz kolejne pytanie?");
    if(this.hasNextQuestion() && isSure) {
      this.clearErrors();
      this.store = produce(this.store, draft => {
        draft.scores.roundScore = 0;
        draft.currentQuestionIndex += 1;
      })

      this.play('jingiel_start.mp3');
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
