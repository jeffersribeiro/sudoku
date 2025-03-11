import { MAX_NUMBER } from "../constants";

export function validateCellValue(cellValue: string): void {
  if (!cellValue) {
    throw new Error(`You must provide a value`);
  } else if (Number.isNaN(cellValue)) {
    throw new Error("Value must be a number");
  } else if (Number(cellValue) <= 0 || Number(cellValue) > MAX_NUMBER) {
    throw new Error(`The value must be between 0 and ${MAX_NUMBER}`);
  }
}
