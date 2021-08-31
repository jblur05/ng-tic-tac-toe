import { Injectable } from "@angular/core";
import { BoardMark, Direction, CellLocation, PlayResult } from "../../types";

@Injectable()
export class GameBoardService {
    private _gameBoard: BoardMark[][] = [[]];
    private numberOfPlays = 0;
    private maxNumberOfPlays = 0;
    constructor() {
        this.initializeBoard(3);
    }

    /**
     * Returns the size of the game board.
     */
    public get boardSize(): number {
        return this._gameBoard.length;
    }

    /**
     * Returns the game board grid as a
     * 2d array.
     */
    public get gameBoard(): BoardMark[][] {
        return this._gameBoard;
    }

    /**
     * Creates a new empty square gameboard
     * using the provided size
     * @param size the size of the gameboard
     */
    public initializeBoard(size: number) {
        if (size < 2) {
            throw new Error("Board size must be larger than 1");
        }

        this._gameBoard = Array(size);
        for(let i = 0; i < size; i++) {
            this._gameBoard[i] = Array(size).fill(BoardMark.Empty)
        }

        this.numberOfPlays = 0;
        this.maxNumberOfPlays = size * size;
    }

    /**
     * Sets the provided mark at the indicated location on the gameboard,
     * then checks if the result of placing that mark resulted in a win.
     * 
     * This method throws an error in the following cases:
     *   if the location on the board is not empty
     *   if the provided mark is not a valid playable mark (X, O only)
     *   if the location is out of bounds
     * @param mark 
     * @param param1 
     * @returns 
     */
    public playAndCheck(mark: BoardMark, {row, col}: CellLocation): PlayResult {
        if (mark === BoardMark.Empty) {
            // shouldn't happen, this indicates programming error
            // should add logger message here
            throw new Error("User cannot play using an empty mark");
        }

        if (row >= this.boardSize || col >= this.boardSize) {
            // this also shouldn't happen unless there is a programming error.
            throw new Error(`Row or col out of bounds for board of size ${this.boardSize}. Row: ${row}, Col: ${col}`);
        }

        if (this._gameBoard[row][col] !== BoardMark.Empty) {
            throw new Error(`Cell at [${row}, ${col}] has already been filled, please try again.`);
        }

        // at this point it should be safe to play the piece
        this._gameBoard[row][col] = mark;

        // check forward diagonal
        let result = this.checkDiagonal(row, col, mark, false);

        // check backward diagonal
        if (!result.isWin) {
            result = this.checkDiagonal(row, col, mark, true);
        }

        if (!result.isWin) {
            result = this.checkVertical(col, mark);
        }

        if (!result.isWin) {
            result = this.checkHorizontal(row, mark);
        }

        // check for a draw
        if (++this.numberOfPlays === this.maxNumberOfPlays) {
            return {
                isWin: false,
                isDraw: true
            }
        }

        return result;
    }

    private checkVertical(col: number, mark: BoardMark): PlayResult {
        // move down the rows while keeping the column constant
        for (let curRow = 0; curRow < this.boardSize; curRow++) {
            if (this.gameBoard[curRow][col] !== mark) {
                // bail, we found either an empty or opposite player mark
                return  {
                    isWin: false
                };
            }
        }

        // if we got here then we have successfully found the mark at
        // every location in the horizontal direction, this is a win.
        return {
            isWin: true,
            winLocation: {row: 0, col},
            winDirection: Direction.Vertical
        };
    }

    private checkHorizontal(row: number, mark: BoardMark): PlayResult {
        // move across the cols while keeping the row constant
        for (let curCol = 0; curCol < this.boardSize; curCol++) {
            if (this.gameBoard[row][curCol] !== mark) {
                // bail, we found either an empty or opposite player mark
                return  {
                    isWin: false
                };
            }
        }

        // if we got here then we have successfully found the mark at
        // every location in the horizontal direction, this is a win.
        return {
            isWin: true,
            winLocation: {row, col: 0},
            winDirection: Direction.Horizontal
        };
    }

    private checkDiagonal(row: number, col: number, mark: BoardMark, checkBackDiag: boolean): PlayResult {
        if (!checkBackDiag && row !== col
            // back diag row + col is always 1 less than the size of the board
            || checkBackDiag && (row + col) !== (this.boardSize - 1)) {
            return {
                isWin: false
            };
        }

        // start either in the top left corner (col = 0) 
        // or right corner if back diagonal (col = size - 1)
        let curCol = checkBackDiag ? this.boardSize - 1 : 0;
        // move down the diagonal and add to the win array
        // each time we find a matching mark, return
        // fail if we find bad mark
        for (let curRow = 0; curRow < this.boardSize; curRow ++) {
            if (this.gameBoard[curRow][curCol] !== mark) {
                // bail, we found either an empty or opposite player mark
                return  {
                    isWin: false
                };
            }

            // go to next column
            curCol = checkBackDiag ? curCol - 1 : curCol + 1
        }

        // if we got here then we have successfully found the mark at
        // every location in the horizontal direction, this is a win.
        return {
            isWin: true,
            winLocation: {row: 0, col: checkBackDiag ? this.boardSize - 1 : 0},
            winDirection: Direction.Horizontal
        };
    }
}
    