export function ErrorHandlerUI(error: unknown): void {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
