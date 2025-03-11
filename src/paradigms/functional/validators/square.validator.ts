import { BoardType } from "../../../types/board";
import { MAX_NUMBER } from "../constants";

export function validateSquareBoard(
  value: number,
  [x, y]: [number, number],
  board: BoardType
): void {
  const boardOnlyWithValues: (number | null)[][] = [];
  let previous: (number | null)[] = [];

  board
    .map((cell) => cell[1])
    .map((cell, index) => {
      previous.push(cell);

      if ((index + 1) % MAX_NUMBER === 0) {
        boardOnlyWithValues.push(previous);
        previous = [];
      }
    });

  const startX = Math.floor(x / 3) * 3;
  const startY = Math.floor(y / 3) * 3;

  for (let i = startX; i < startX + 3; i++) {
    for (let j = startY; j < startY + 3; j++) {
      if (boardOnlyWithValues[i][j] === value) {
        throw new Error(`${value} Already exists on this Square.`);
      }
    }
  }
}
