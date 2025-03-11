import { BoardType } from "../../../types/board";
import { MAX_NUMBER } from "../constants";
import { formatCellIdentifierToPrint } from "../helpers";

export function PrintBoardUI(board: BoardType): void {
  let drawed = "";

  board.forEach((cell, index) => {
    drawed += `[${formatCellIdentifierToPrint(cell[0])}, ${
      cell[1] ? `  ${cell[1]}  ` : "  "
    }]`;

    if ((index + 1) % MAX_NUMBER === 0) {
      drawed += "\n";
    }
  });

  console.log(drawed);
}
