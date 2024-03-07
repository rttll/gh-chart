#!/usr/bin/env node
import { renameSync } from 'fs';
import * as path from 'path';

import { parseArgv } from './utils/cli';
import { build } from './charts/gantt';

const { repo = '', limit = 10 } = parseArgv();

if (!repo) {
  console.log('use --repo arg');
  process.exit(1);
}

const dataPath = build(repo, limit);
const targetPath = path.join(__dirname, '../public/gantt/dist/data.js');
renameSync(dataPath, targetPath);
