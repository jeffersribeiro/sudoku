import { BoardType } from "../../../types/board";
import { getCellCoordinatesFromIndex, getInput } from "../helpers";
import { ErrorHandlerUI } from "../UI_components/error_message_handler.ui";
import {
  validateCellValue,
  validateColumnOfBoard,
  validateRowOfBoard,
  validateSquareBoard,
} from "../validators";

export async function getCellValueInput(
  index: number,
  board: BoardType
): Promise<string> {
  try {
    const coordinates = getCellCoordinatesFromIndex(index, board);

    const cellValue = await getInput(
      "Por favor, Ensira um valor entre 1 a 9\n"
    );

    validateCellValue(cellValue);

    validateRowOfBoard(Number(cellValue), coordinates, board);
    validateColumnOfBoard(Number(cellValue), coordinates, board);
    validateSquareBoard(Number(cellValue), coordinates, board);

    return cellValue;
  } catch (error) {
    ErrorHandlerUI(error);
    return getCellValueInput(index, board);
  }
}
