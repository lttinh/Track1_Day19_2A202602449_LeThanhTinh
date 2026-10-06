import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runMeasuredCommand } from "./workflow-metrics.mjs";

const [project, archive] = process.argv.slice(2);
if (!project || !archive) throw new Error("usage: package-site.mjs PROJECT_DIR ARCHIVE_PATH");

const stage = mkdtempSync(path.join(tmpdir(), "sites-package-"));
const destination = path.join(stage, "dist");
const prepare = fileURLToPath(new URL("../skills/sites/scripts/prepare-site-build.cjs", import.meta.url));

try {
  await runMeasuredCommand([process.execPath, prepare, project, destination]);
  mkdirSync(path.dirname(archive), { recursive: true });
  await runMeasuredCommand(["tar", "-C", stage, "-czf", archive, "dist"]);
  process.stdout.write(`${archive}\n`);
} finally {
  rmSync(stage, { recursive: true, force: true });
}
