export function validateCoordinates(coordinates: string): void {
  const regex = /^\d+\d+$/;

  if (!regex.test(coordinates)) {
    throw new Error(`Coordinates must be on the pattern NUMBER NUMBER like 00`);
  }
}
