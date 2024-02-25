#!/usr/bin/env node
import { parseArgv } from './utils/cli';
import { build } from './chart/gantt';
import { Repo } from './types';

const { repo = '', limit = 10 } = parseArgv();

const report = build(repo, limit);
console.log(report);
