import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const metadataDir = resolve("dist", ".openai");
mkdirSync(metadataDir, { recursive: true });
copyFileSync(resolve(".openai", "hosting.json"), resolve(metadataDir, "hosting.json"));
