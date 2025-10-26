import { createRequire } from "node:module";

const { pipe_create } = createRequire(import.meta.url)(
  "./build/Release/nodejs-raw-unix-pipe.node"
);

export type PipeCreateResult = [number, number];

export const pipeCreate = (): PipeCreateResult => {
  return pipe_create();
};
