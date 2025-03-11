export function mountCellKeyIndexIndetifier([x, y]: [number, number]): string {
  return x.toString().concat("_").concat(y.toString());
}
