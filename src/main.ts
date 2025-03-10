console.clear();
import readline from "readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

type BoardType = [string, number | null][];

const MAX_NUMBER = 9;

async function getInput(prompt: string): Promise<string> {
  const answer = await new Promise((resolve) => rl.question(prompt, resolve));

  return String(answer);
}

function errorHandler(error: unknown): void {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

async function getCoordinatesInput(): Promise<string> {
  try {
    const coodinates = await getInput(
      "Por favor, escolha uma posição? EX: 0 0\n"
    );

    validateCoordinates(coodinates);

    return coodinates;
  } catch (error) {
    errorHandler(error);
    return getCoordinatesInput();
  }
}

async function getCellValueInput(
  index: number,
  board: BoardType
): Promise<string> {
  try {
    const cellValue = await getInput(
      "Por favor, Ensira um valor entre 1 a 9\n"
    );

    validateCellValue(cellValue);

    validateColAndRowOfBoard(Number(cellValue), index, board);
    validateSquareBoard(Number(cellValue), index, board);

    return cellValue;
  } catch (error) {
    errorHandler(error);
    return getCellValueInput(index, board);
  }
}

function hasCellEmpty(board: BoardType): boolean {
  if (!board.length) throw new Error("Board is empty");

  for (const cell of board) {
    if (cell.includes(0)) return true;
    else return false;
  }

  return false;
}

function mountCellKeyIndexIndetifier(x: number, y: number): string {
  return x.toString().concat("_").concat(y.toString());
}

function getCellCoordinatesFromIndex(
  index: number,
  board: BoardType
): [number, number] {
  const [x, y] = board[index][0].split("_");

  return [Number(x), Number(y)];
}

function getCellCoordinates(coodinates: string): number[] {
  const [x, y] = coodinates.split("");
  return [Number(x), Number(y)];
}

function findCellIndexByCoordinates(
  coodinates: string,
  board: BoardType
): number {
  const [x, y] = getCellCoordinates(coodinates);

  const boardCopy = board.map(([keyIdentifier]) => keyIdentifier);

  const keyIndexIndetifier = mountCellKeyIndexIndetifier(x, y);

  const index = boardCopy.findIndex(
    (cellKey) => cellKey === keyIndexIndetifier
  );

  return index;
}

function insertCellValue(board: BoardType, index: number, value: number): void {
  board[index] = [board[index][0], value];
}

function formatCellIdentifierToPrint(idenfitier: string): string {
  return idenfitier.replace("_", " ");
}

function printBoard(board: BoardType): void {
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

function mountBoard(): BoardType {
  const board: BoardType = [];
  for (let x = 0; x < MAX_NUMBER; x++) {
    for (let y = 0; y < MAX_NUMBER; y++) {
      board.push([mountCellKeyIndexIndetifier(x, y), null]);
    }
  }

  return board;
}

function validateCellValue(cellValue: string): void {
  if (!cellValue) {
    throw new Error(`You must provide a value`);
  } else if (Number.isNaN(cellValue)) {
    throw new Error("Value must be a number");
  } else if (Number(cellValue) <= 0 || Number(cellValue) > MAX_NUMBER) {
    throw new Error(`The value must be between 0 and ${MAX_NUMBER}`);
  }
}

function validateCoordinates(coordinates: string): void {
  const regex = /^\d+\d+$/;

  if (!regex.test(coordinates)) {
    throw new Error(`Coordinates must be on the pattern NUMBER NUMBER like 00`);
  }
}

function validateSquareBoard(
  value: number,
  index: number,
  board: BoardType
): void {
  const [x, y] = getCellCoordinatesFromIndex(index, board);

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

function validateColAndRowOfBoard(
  value: number,
  index: number,
  board: BoardType
): void {
  const [x, y] = getCellCoordinatesFromIndex(index, board);

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
  const column = boardOnlyWithValues.map((row) => row[y]);

  const isRowValid = !row.includes(value) || row[y] === value;
  if (!isRowValid) {
    throw new Error(`${value} Already present on row`);
  }

  const isColumnValid =
    !column.some((cell) => cell === value) || column[x] === value;
  if (!isColumnValid) {
    throw new Error(`${value} Already present on column`);
  }
}

(async () => {
  const board = mountBoard();
  do {
    printBoard(board);

    const coodinates = await getCoordinatesInput();

    const index = findCellIndexByCoordinates(coodinates, board);

    const value = await getCellValueInput(index, board);

    insertCellValue(board, index, Number(value));
  } while (!hasCellEmpty(board));
})();
