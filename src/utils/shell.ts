import * as shell from 'shelljs';

export class Executor {
  static executeCommand(command: string): string {
    return shell.exec(command, { silent: true }).stdout;
  }
}