import { BoardType } from "../../types/board";
import { MAX_NUMBER } from "../functional/constants";
import { Helpers } from "./helpers";

export class Board {
  private readonly board: BoardType = [];

  constructor(private readonly helpers: Helpers) {
    this.mount();
  }

  private mount() {
    for (let x = 0; x < MAX_NUMBER; x++) {
      for (let y = 0; y < MAX_NUMBER; y++) {
        this.board.push([
          this.helpers.mountCellKeyIndexIndetifier([x, y]),
          null,
        ]);
      }
    }
  }

  public getBoard(): BoardType {
    return this.board;
  }

  public insertCellValue(board: BoardType, index: number, value: number): void {
    board[index] = [board[index][0], value];
  }
}
