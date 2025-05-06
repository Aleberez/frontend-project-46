import { readFileSync } from 'node:fs';
import path from 'node:path';

export default (filepath) => {
  const absolutePath = path.resolve(filepath);
  const data = readFileSync(absolutePath, 'utf-8');
  return JSON.parse(data);
};
