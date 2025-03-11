import { BoardType } from "../../types/board";
import readline from "readline";
import { stdin as input, stdout as output } from "node:process";
import { Board } from "./board";

export class Helpers {
  private readonly rl = readline.createInterface({ input, output });

  findCellIndexByCoordinates(coodinates: string, board: Board): number {
    const coordinates = this.getCellCoordinates(coodinates);

    const boardCopy = board.getBoard().map(([keyIdentifier]) => keyIdentifier);

    const keyIndexIndetifier = this.mountCellKeyIndexIndetifier(coordinates);

    const index = boardCopy.findIndex(
      (cellKey) => cellKey === keyIndexIndetifier
    );

    return index;
  }

  formatCellIdentifierToPrint(idenfitier: string): string {
    return idenfitier.replace("_", " ");
  }

  getCellCoordinatesFromIndex(
    index: number,
    board: BoardType
  ): [number, number] {
    const [x, y] = board[index][0].split("_");

    return [Number(x), Number(y)];
  }

  getCellCoordinates(coodinates: string): [number, number] {
    const [x, y] = coodinates.split("");
    return [Number(x), Number(y)];
  }

  mountCellKeyIndexIndetifier([x, y]: [number, number]): string {
    return x.toString().concat("_").concat(y.toString());
  }

  async getInput(prompt: string): Promise<string> {
    const answer = await new Promise((resolve) =>
      this.rl.question(prompt, resolve)
    );

    return String(answer);
  }
}
