import { BoardType } from "../../../types/board";
import { MAX_NUMBER } from "../constants";

export function validateColumnOfBoard(
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

  const column = boardOnlyWithValues.map((row) => row[y]);

  const isColumnValid =
    !column.some((cell) => cell === value) || column[x] === value;
  if (!isColumnValid) {
    throw new Error(`${value} Already present on column`);
  }
}
