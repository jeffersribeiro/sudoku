import {
  mountBoard,
  insertCellValue,
  findCellIndexByCoordinates,
} from "./helpers";
import { getCellValueInput, getCoordinatesInput } from "./inputs";

import { PrintBoardUI } from "./UI_components";
import { hasCellEmpty } from "./validators";

console.clear();

(async () => {
  const board = mountBoard();
  do {
    PrintBoardUI(board);

    const coodinates = await getCoordinatesInput();

    const index = findCellIndexByCoordinates(coodinates, board);

    const value = await getCellValueInput(index, board);

    insertCellValue(board, index, Number(value));
  } while (!hasCellEmpty(board));
})();
