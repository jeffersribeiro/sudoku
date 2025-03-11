import { BoardType } from "../../../types/board";

export function getCellCoordinatesFromIndex(
  index: number,
  board: BoardType
): [number, number] {
  const [x, y] = board[index][0].split("_");

  return [Number(x), Number(y)];
}
