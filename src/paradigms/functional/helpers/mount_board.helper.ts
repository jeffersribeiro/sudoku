import { BoardType } from "../../../types/board";
import { MAX_NUMBER } from "../constants";
import { mountCellKeyIndexIndetifier } from "./mount_cell_key_index_identifier.helper";

export function mountBoard(): BoardType {
  const board: BoardType = [];
  for (let x = 0; x < MAX_NUMBER; x++) {
    for (let y = 0; y < MAX_NUMBER; y++) {
      board.push([mountCellKeyIndexIndetifier([x, y]), null]);
    }
  }

  return board;
}
