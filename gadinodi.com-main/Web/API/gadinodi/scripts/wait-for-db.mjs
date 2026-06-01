import { createConnection } from "node:net";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const envPath = join(projectRoot, ".env");

function loadEnvFile(pathname) {
  if (!existsSync(pathname)) {
    return;
  }

  const content = readFileSync(pathname, "utf8");

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function waitForPort(host, port) {
  return new Promise((resolve, reject) => {
    const socket = createConnection({ host, port });

    socket.on("connect", () => {
      socket.end();
      resolve(undefined);
    });

    socket.on("error", (error) => {
      socket.destroy();
      reject(error);
    });
  });
}

async function main() {
  loadEnvFile(envPath);

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const parsed = new URL(databaseUrl);
  const host = parsed.hostname;
  const port = Number(parsed.port || "5432");
  const maxAttempts = 30;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await waitForPort(host, port);
      console.log(`PostgreSQL is reachable at ${host}:${port}`);
      return;
    } catch {
      if (attempt === maxAttempts) {
        throw new Error(`PostgreSQL did not become reachable at ${host}:${port}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
