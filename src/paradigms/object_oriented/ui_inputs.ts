import { BoardType } from "../../types/board";
import { Helpers } from "./helpers";
import { UIComponents } from "./ui_components";
import { Validators } from "./validators";

export class UIInputs {
  constructor(
    private readonly helpers: Helpers,
    private readonly validators: Validators,
    private readonly components: UIComponents
  ) {}

  async getCoordinatesInput(): Promise<string> {
    try {
      const coodinates = await this.helpers.getInput(
        "Por favor, escolha uma posição? EX: 0 0\n"
      );

      this.validators.validateCoordinates(coodinates);

      return coodinates;
    } catch (error) {
      this.components.errorHandler(error);
      return this.getCoordinatesInput();
    }
  }

  async getCellValueInput(index: number, board: BoardType): Promise<string> {
    try {
      const coordinates = this.helpers.getCellCoordinatesFromIndex(
        index,
        board
      );

      const cellValue = await this.helpers.getInput(
        "Por favor, Ensira um valor entre 1 a 9\n"
      );

      this.validators.validateCellValue(cellValue);

      this.validators.validateColumnOfBoard(
        Number(cellValue),
        coordinates,
        board
      );

      this.validators.validateRowOfBoard(Number(cellValue), coordinates, board);

      this.validators.validateSquareBoard(
        Number(cellValue),
        coordinates,
        board
      );

      return cellValue;
    } catch (error) {
      this.components.errorHandler(error);
      return this.getCellValueInput(index, board);
    }
  }
}
