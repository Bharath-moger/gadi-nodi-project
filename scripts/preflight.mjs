import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const minimumNodeMajor = 22;
const minimumNodeMinor = 12;
const unsupportedMajor = 23;

function parseNodeVersion(version) {
  const [major, minor, patch] = version.replace(/^v/, "").split(".").map(Number);

  return { major, minor, patch };
}

function assertSupportedNodeVersion() {
  const { major, minor } = parseNodeVersion(process.version);

  const isSupported22 = major === minimumNodeMajor && minor >= minimumNodeMinor;
  const isSupportedFuture = major >= 24;

  if (major === unsupportedMajor || (!isSupported22 && !isSupportedFuture)) {
    console.error(
      `Node ${process.version} is not supported. Use Node 22.12+ or 24+, and avoid Node 23 because Prisma is not stable on that runtime in this workspace.`,
    );
    process.exit(1);
  }
}

function assertRequiredFiles() {
  const rootDir = fileURLToPath(new URL("..", import.meta.url));
  const requiredFiles = [
    join(rootDir, "Web/API/gadinodi/package.json"),
    join(rootDir, "Web/UI/gadinodi/package.json"),
    join(rootDir, "Web/API/gadinodi/.env.example"),
    join(rootDir, "Web/UI/gadinodi/.env.local.example"),
  ];

  const missingFiles = requiredFiles.filter((pathname) => !existsSync(pathname));

  if (missingFiles.length > 0) {
    console.error(`Missing required project files:\n${missingFiles.join("\n")}`);
    process.exit(1);
  }
}

assertSupportedNodeVersion();
assertRequiredFiles();
