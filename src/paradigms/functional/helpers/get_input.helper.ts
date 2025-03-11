import readline from "readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

export async function getInput(prompt: string): Promise<string> {
  const answer = await new Promise((resolve) => rl.question(prompt, resolve));

  return String(answer);
}
