import { Component, Inject, inject } from "@angular/core";
import { BoardMark, CellLocation } from "src/app/types";
import { GameBoardService } from "../services/game-board.service";
import { GameBoardComponent } from "./game-board.component";

@Component({
    selector: 'play-area',
    templateUrl: './play-area.component.html',
    styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent {
    public currentPlayer = BoardMark.X;
    // this is the result of a game
    public resultMessage: string = '';

    // this tracks if a game is over and can be used
    // to show/hide elements or prevent play from continuing
    public isGameOver: boolean = false;

    // the following tracks how many games each user has completed
    public score: {[player: string]: number} = {
        "X": 0,
        "O": 0
    };

    constructor(public gameBoardService: GameBoardService) { 
        // intentionally blank
    }

    public newGame() {
        this.currentPlayer = BoardMark.X;
        this.resultMessage = '';
        this.isGameOver = false;
        this.gameBoardService.initializeBoard(3);
    }

    /**
     * handles the selection of a cell by a player.
     * @param cellLocation the selected location on the game board
     */
    public cellSelected(cellLocation: CellLocation) {
        try {
            if (!this.isGameOver) {
                // todo check for ties
                const result = this.gameBoardService.playAndCheck(this.currentPlayer, cellLocation);
                if (result.isWin) {
                    this.resultMessage = `Player ${this.currentPlayer} Wins`;
                    this.score[this.currentPlayer]++;
                    this.isGameOver = true;
                } else if (result.isDraw) {
                    this.resultMessage = 'Draw';
                    this.isGameOver = true;
                }
                this.currentPlayer = this.currentPlayer === BoardMark.X ? BoardMark.O : BoardMark.X;
            }
        } catch (exception) {
            // todo display message
        }
    }
}