import { Component, Input } from "@angular/core";

@Component({
  selector: "panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"]
})
export class PanelComponent {
  
  constructor() { }

  synchronizeLocalStorage() {
    localStorage.setItem('hello', Math.random().toString());
  }

  resetGame() {

  }

  chooseSet(index: number) {
    
  }
}
