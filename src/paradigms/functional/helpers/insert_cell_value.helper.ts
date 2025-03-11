import { BoardType } from "../../../types/board";

export function insertCellValue(
  board: BoardType,
  index: number,
  value: number
): void {
  board[index] = [board[index][0], value];
}
