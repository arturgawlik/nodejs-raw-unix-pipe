import { createRequire } from "node:module";

const native = createRequire(import.meta.url)(
  "./build/Release/nodejs-raw-unix-pipe.node"
);

export type PipeCreateResult = [number, number];

export const pipeCreate = (): PipeCreateResult => {
  return native.pipe_create();
};
