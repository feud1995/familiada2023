import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { ScoreComponent } from "./components/score/score.component";
import { PanelComponent } from "./components/panel/panel.component";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from "./app-routing.module";
import { BoardComponent } from './components/board/board.component';
import { AnswerComponent } from './components/answer/answer.component';
import { ScoreSmallComponent } from './components/score-small/score-small.component';

@NgModule({
  declarations: [AppComponent, ScoreComponent, PanelComponent, BoardComponent, AnswerComponent, ScoreSmallComponent],
  imports: [BrowserModule,
     BrowserAnimationsModule, CommonModule, MatButtonModule,
     AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
