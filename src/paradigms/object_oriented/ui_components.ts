import { BoardType } from "../../types/board";
import { MAX_NUMBER } from "./constants";
import { Helpers } from "./helpers";

export class UIComponents {
  constructor(private readonly helpers: Helpers) {}

  printBoard(board: BoardType): void {
    let drawed = "";

    board.forEach((cell, index) => {
      drawed += `[${this.helpers.formatCellIdentifierToPrint(cell[0])}, ${
        cell[1] ? `  ${cell[1]}` : "   "
      }]`;

      if ((index + 1) % MAX_NUMBER === 0) {
        drawed += "\n";
      }
    });

    console.log(drawed);
  }

  errorHandler(error: unknown): void {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
