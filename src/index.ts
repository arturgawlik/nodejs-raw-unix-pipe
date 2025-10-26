import { createRequire } from "node:module";
import { join } from "node:path";

const { pipe_create } = createRequire(import.meta.url)(
  join(import.meta.dirname, "../build/Release/nodejs-raw-unix-pipe.node")
);

export type PipeCreateResult = [number, number];

export const pipeCreate = (): PipeCreateResult => {
  return pipe_create();
};
