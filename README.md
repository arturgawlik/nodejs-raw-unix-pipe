### What it is

Very simple library that provides binding to native unix pipes for inter process communication.

### How to use it

#### Install

```bash
npm i nodejs-raw-unix-pipe
```

#### Run

```typescript
import { spawn } from "node:child_process";
import { close, read, write } from "node:fs";
import { pipeline } from "node:stream/promises";
import { pipeCreate } from "nodejs-raw-unix-pipe";

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
    close(readFd);
    close(writeFd);
  });
}

function isChild() {
  return process.argv[2] === kChildMarker;
}

function getReadFd() {
  return Number(process.argv[3]);
}
```
