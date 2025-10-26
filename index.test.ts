import { test } from "node:test";
import assert from "node:assert";
import { pipeCreate } from "./index.ts";

test("should create pipe", () => {
  const [readFd, writeFd] = pipeCreate();
  assert(typeof readFd, "number");
  assert(typeof writeFd, "number");
});
