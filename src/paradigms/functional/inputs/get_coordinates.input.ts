import { getInput } from "../helpers";
import { ErrorHandlerUI } from "../UI_components/error_message_handler.ui";
import { validateCoordinates } from "../validators/coordinates.validator";

export async function getCoordinatesInput(): Promise<string> {
  try {
    const coodinates = await getInput(
      "Por favor, escolha uma posição? EX: 0 0\n"
    );

    validateCoordinates(coodinates);

    return coodinates;
  } catch (error) {
    ErrorHandlerUI(error);
    return getCoordinatesInput();
  }
}
