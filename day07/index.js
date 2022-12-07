export function partOne(input) {
  const fs = processInput(input);
  const dirSizes = [];
  getDirSize(fs["/"], dirSizes);
  return dirSizes.reduce((a, c) => (c <= 100000 ? a + c : a), 0);
}

const TOTAL_DISK_SPACE = 70000000;
const FREE_SPACE_REQUIRED = 30000000;

export function partTwo(input) {
  const fs = processInput(input);
  const dirSizes = [];
  const dirSize = getDirSize(fs["/"], dirSizes);
  const unusedSpace = TOTAL_DISK_SPACE - dirSize;
  const minDeletionSize = FREE_SPACE_REQUIRED - unusedSpace;
  return dirSizes.sort((a, b) => a - b).find((a) => a > minDeletionSize);
}

function getDirSize(dir, dirList) {
  const dirSize = Object.values(dir).reduce((acc, cur) => {
    if (typeof cur === "number") {
      return acc + cur;
    }
    return acc + getDirSize(cur, dirList);
  }, 0);

  dirList.push(dirSize);

  return dirSize;
}

function processInput(input) {
  const commands = parseCommands(input.split(`\n`));
  return buildFileSystem(commands);
}

function buildFileSystem(commands) {
  return commands.reduce(
    ({ fileSystem, currentPath }, { command, arg, output }) => {
      if (command === "cd") {
        return { fileSystem, currentPath: getNextPath(currentPath, arg) };
      }

      write(fileSystem, currentPath, createContents(output));
      return { fileSystem, currentPath };
    },
    { fileSystem: { "/": {} }, currentPath: ["/"] }
  ).fileSystem;
}

function parseCommands(lines) {
  return lines.reduce((commands, line) => {
    if (line.startsWith("$")) {
      const [command, arg] = line.slice(2).split(" ");
      return [...commands, { command, arg, output: [] }];
    }

    const i = commands.length - 1;
    return [
      ...commands.slice(0, i),
      { ...commands[i], output: [...commands[i].output, line] },
    ];
  }, []);
}

function getNextPath(currentPath, arg) {
  switch (arg) {
    case "/":
      return currentPath.slice(0, 1);
    case "..":
      return currentPath.slice(0, -1);
    default:
      return [...currentPath, arg];
  }
}

function createContents(lsOutput) {
  return lsOutput.reduce((contents, line) => {
    const [a, b] = line.split(" ");
    return { ...contents, [b]: a === "dir" ? {} : Number(a) };
  }, {});
}

function navigateToPath(fileSystem, path) {
  return path.reduce(
    (workingDirectory, item) => workingDirectory[item],
    fileSystem
  );
}

function write(fileSystem, path, stuff) {
  const folder = navigateToPath(fileSystem, path.slice(0, -1));
  folder[path[path.length - 1]] = stuff;
}
