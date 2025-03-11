import { BoardType } from "../../types/board";
import { MAX_NUMBER } from "./constants";

export class Validators {
  validateCellValue(cellValue: string): void {
    if (!cellValue) {
      throw new Error(`You must provide a value`);
    } else if (Number.isNaN(cellValue)) {
      throw new Error("Value must be a number");
    } else if (Number(cellValue) <= 0 || Number(cellValue) > MAX_NUMBER) {
      throw new Error(`The value must be between 0 and ${MAX_NUMBER}`);
    }
  }

  validateColumnOfBoard(
    value: number,
    [x, y]: [number, number],
    board: BoardType
  ): void {
    const boardOnlyWithValues: (number | null)[][] = [];
    let previous: (number | null)[] = [];

    board
      .map((cell) => cell[1])
      .map((cell, index) => {
        previous.push(cell);

        if ((index + 1) % MAX_NUMBER === 0) {
          boardOnlyWithValues.push(previous);
          previous = [];
        }
      });

    const column = boardOnlyWithValues.map((row) => row[y]);

    const isColumnValid =
      !column.some((cell) => cell === value) || column[x] === value;
    if (!isColumnValid) {
      throw new Error(`${value} Already present on column`);
    }
  }

  validateCoordinates(coordinates: string): void {
    const regex = /^\d+\d+$/;

    if (!regex.test(coordinates)) {
      throw new Error(
        `Coordinates must be on the pattern NUMBER NUMBER like 00`
      );
    }
  }

  hasCellEmpty(board: BoardType): boolean {
    if (!board.length) throw new Error("Board is empty");

    for (const cell of board) {
      if (cell.includes(0)) return true;
      else return false;
    }

    return false;
  }

  validateRowOfBoard(
    value: number,
    [x, y]: [number, number],
    board: BoardType
  ): void {
    const boardOnlyWithValues: (number | null)[][] = [];
    let previous: (number | null)[] = [];

    board
      .map((cell) => cell[1])
      .map((cell, index) => {
        previous.push(cell);

        if ((index + 1) % MAX_NUMBER === 0) {
          boardOnlyWithValues.push(previous);
          previous = [];
        }
      });

    const row = boardOnlyWithValues[x];

    const isRowValid = !row.includes(value) || row[y] === value;
    if (!isRowValid) {
      throw new Error(`${value} Already present on row`);
    }
  }

  validateSquareBoard(
    value: number,
    [x, y]: [number, number],
    board: BoardType
  ): void {
    const boardOnlyWithValues: (number | null)[][] = [];
    let previous: (number | null)[] = [];

    board
      .map((cell) => cell[1])
      .map((cell, index) => {
        previous.push(cell);

        if ((index + 1) % MAX_NUMBER === 0) {
          boardOnlyWithValues.push(previous);
          previous = [];
        }
      });

    const startX = Math.floor(x / 3) * 3;
    const startY = Math.floor(y / 3) * 3;

    for (let i = startX; i < startX + 3; i++) {
      for (let j = startY; j < startY + 3; j++) {
        if (boardOnlyWithValues[i][j] === value) {
          throw new Error(`${value} Already exists on this Square.`);
        }
      }
    }
  }
}
