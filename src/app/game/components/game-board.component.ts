import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BoardMark, CellLocation } from "../../types";

@Component({
    selector: 'game-board',
    templateUrl: './game-board.component.html'
  })
  export class GameBoardComponent {
    @Input() gameBoard: BoardMark[][] = [[]];
    @Output() cellSelected = new EventEmitter<CellLocation>();

    public cellClicked(event: any, row: number, col: number) {
      this.cellSelected.emit({row, col});
      event.stopPropagation();
    }
  }