/**
 * 1. Creates unix pipe.
 * 2. Spawns child process and send read file descriptor to it as argument.
 * 3. Sends message to the write file descriptor.
 */
import { spawn } from "node:child_process";
import { closeSync, read, write } from "node:fs";
import { pipeline } from "node:stream/promises";
import { pipeCreate } from "../../src/index.ts";

const kChildMarker = "--is-child=true";

if (isChild()) {
  const readFd = getReadFd();
  read(readFd, (err, bytesRead, buffer) => {
    if (err) console.error(`[CHILD] ${err}`);
    console.log(`[CHILD] bytes received: ${bytesRead}`);
    console.log(`[CHILD] msg received: ${buffer.toString()}`);
  });
} else {
  const [readFd, writeFd] = pipeCreate();
  const childProcess = spawn(process.argv0, [
    import.meta.filename,
    kChildMarker,
    String(readFd),
  ]);
  pipeline(childProcess.stdout, process.stdout);
  write(writeFd, "hello from parent!", (err, written, str) => {
    if (err) console.error(`[PARENT] ${err}`);
    console.log(`[PARENT] bytes written: ${written}`);
    console.log(`[PARENT] msg written: ${str}`);
  });
  process.on("exit", () => {
    closeSync(readFd);
    closeSync(writeFd);
  });
}

function isChild() {
  return process.argv[2] === kChildMarker;
}

function getReadFd() {
  return Number(process.argv[3]);
}
