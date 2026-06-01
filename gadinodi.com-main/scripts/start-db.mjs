import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
  });

  if (result.error) {
    if (result.error.code === "ENOENT") {
      console.error(
        "Docker is not installed or not on PATH. Install Docker Desktop or point the API DATABASE_URL to an existing PostgreSQL instance.",
      );
      process.exit(1);
    }

    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("docker", ["compose", "up", "-d", "postgres"]);
