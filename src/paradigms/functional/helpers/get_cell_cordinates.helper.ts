export function getCellCoordinates(coodinates: string): [number, number] {
  const [x, y] = coodinates.split("");
  return [Number(x), Number(y)];
}
