import { BoardType } from "../../../types/board";

export function hasCellEmpty(board: BoardType): boolean {
  if (!board.length) throw new Error("Board is empty");

  for (const cell of board) {
    if (cell.includes(0)) return true;
    else return false;
  }

  return false;
}
