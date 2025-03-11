import { BoardType } from "../../../types/board";
import { MAX_NUMBER } from "../constants";

export function validateRowOfBoard(
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

  const row = boardOnlyWithValues[x];

  const isRowValid = !row.includes(value) || row[y] === value;
  if (!isRowValid) {
    throw new Error(`${value} Already present on row`);
  }
}
