/**
 * Defines the valid marks that can be placed
 * on a board. Empty represents an unplayed mark.
 */
export enum BoardMark { X="X", O="O", Empty="" };

export enum Direction {
    Horizontal,
    Vertical,
    Diagonal
}

export type CellLocation = {
    row: number,
    col: number
}

export type PlayResult = {
    isWin: boolean;
    isDraw?: boolean;
    winLocation?: CellLocation;
    winDirection?: Direction
}