// printer-answers-20261127
//
// make.fun bounty: "The Printer Finally Answers".
// The printer has printed 47,312 pages. Now it gets to reply.
// One entry, 240 characters max. This program checks the line and
// writes it to entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY =
  "I have printed 47,312 pages for you. The one time you need me, you chose violence.";

const MIN_CHARS = 1;
const MAX_CHARS = 240;

function checkEntry(text: string): void {
  if (!text) throw new Error("entry is empty");
  if (text.length < MIN_CHARS) throw new Error("entry is too short");
  if (text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars; the limit is ${MAX_CHARS}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim() !== text) throw new Error("entry has leading/trailing whitespace");
  if (/\s\s/.test(text)) throw new Error("entry has a double space");
  if (text.split(" ").length < 5) throw new Error("entry is too short to be a reply");
}

function main(): void {
  checkEntry(ENTRY);
  const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  mkdirSync(outputDir, { recursive: true });
  const outputFile = join(outputDir, "entry.txt");
  writeFileSync(outputFile, ENTRY + "\n", "utf8");
  console.log(`entry (${ENTRY.length} chars) saved to ${outputFile}`);
}

main();
