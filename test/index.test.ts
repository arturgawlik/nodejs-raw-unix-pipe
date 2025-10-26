import { test } from "node:test";
import assert from "node:assert";
import { spawn } from "node:child_process";
import { join } from "node:path";
import { pipeCreate } from "../src/index.ts";
import { pipeline } from "node:stream/promises";

test("should create pipe", () => {
  const [readFd, writeFd] = pipeCreate();
  assert(typeof readFd, "number");
  assert(typeof writeFd, "number");
});

test("should allow to communicate with child process", async () => {
  const childProcess = spawn(process.argv0, [
    join(import.meta.dirname, "./fixtures/spawn-child-and-send-message.ts"),
  ]);
  let buffer = "";
  await pipeline(childProcess.stdout, async (source) => {
    for await (const chunk of source) {
      // TODO: I don't know why I'm receiving here so much bytes with "0" value.
      buffer += chunk.filter((byte) => byte !== 0).toString();
    }
  });
  const bufferByNewLine = buffer.split("\n").filter((v) => !!v);
  assert.deepEqual(bufferByNewLine, [
    "[PARENT] bytes written: 18",
    "[PARENT] msg written: hello from parent!",
    "[CHILD] bytes received: 18",
    "[CHILD] msg received: hello from parent!",
  ]);
});
