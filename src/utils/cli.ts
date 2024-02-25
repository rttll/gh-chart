interface CommandLineOptions {
  owner?: string;
  repo?: string;
  limit?: number;
}

function parseArgv(): CommandLineOptions {
  const args = process.argv.slice(2);
  const options: CommandLineOptions = {};

  args.forEach((arg, index) => {
    if (arg.startsWith('--')) {
      const nextArg = args[index + 1];
      switch (arg) {
        case '--owner':
          options.owner = nextArg;
          break;
        case '--repo':
          options.repo = nextArg;
          break;
        case '--limit':
          options.limit = parseInt(nextArg, 10);
          break;
      }
    }
  });

  return options;
}

export { parseArgv };
