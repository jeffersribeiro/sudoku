import { BoardType } from "../../types/board";
import { Board } from "./board";
import { Helpers } from "./helpers";
import { UIComponents } from "./ui_components";
import { UIInputs } from "./ui_inputs";
import { Validators } from "./validators";

console.clear();

export class SudokuGame {
  static async start(): Promise<void> {
    const helpers: Helpers = new Helpers();
    const validators: Validators = new Validators();
    const board = new Board(helpers);
    const components: UIComponents = new UIComponents(helpers);
    const inputs: UIInputs = new UIInputs(helpers, validators, components);

    do {
      components.printBoard(board.getBoard());

      const coodinates = await inputs.getCoordinatesInput();

      const index = helpers.findCellIndexByCoordinates(coodinates, board);

      const value = await inputs.getCellValueInput(index, board.getBoard());

      board.insertCellValue(board.getBoard(), index, Number(value));
    } while (!validators.hasCellEmpty(board.getBoard()));
  }
}

SudokuGame.start();
