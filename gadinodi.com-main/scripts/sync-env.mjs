import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

const envPairs = [
  {
    from: join(rootDir, "Web/API/gadinodi/.env.example"),
    to: join(rootDir, "Web/API/gadinodi/.env"),
  },
  {
    from: join(rootDir, "Web/UI/gadinodi/.env.local.example"),
    to: join(rootDir, "Web/UI/gadinodi/.env.local"),
  },
];

for (const pair of envPairs) {
  if (!existsSync(pair.to)) {
    copyFileSync(pair.from, pair.to);
    console.log(`Created ${pair.to}`);
  } else {
    console.log(`Kept existing ${pair.to}`);
  }
}
