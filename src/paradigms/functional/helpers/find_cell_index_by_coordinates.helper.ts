import { BoardType } from "../../../types/board";
import { getCellCoordinates } from "./get_cell_cordinates.helper";
import { mountCellKeyIndexIndetifier } from "./mount_cell_key_index_identifier.helper";

export function findCellIndexByCoordinates(
  coodinates: string,
  board: BoardType
): number {
  const coordinates = getCellCoordinates(coodinates);

  const boardCopy = board.map(([keyIdentifier]) => keyIdentifier);

  const keyIndexIndetifier = mountCellKeyIndexIndetifier(coordinates);

  const index = boardCopy.findIndex(
    (cellKey) => cellKey === keyIndexIndetifier
  );

  return index;
}
