import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import getTree from './treeBuilder.js';
import formatter from './formatters/index.js';

const resolvePath = (filePath) => path.resolve(process.cwd(), filePath);

const getExtension = (filename) => path.extname(filename).slice(1);

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const file1Content = readFileSync(resolvePath(filepath1), 'utf-8');
  const file2Content = readFileSync(resolvePath(filepath2), 'utf-8');
  const data1 = parse(file1Content, getExtension(filepath1));
  const data2 = parse(file2Content, getExtension(filepath2));

  return formatter(getTree(data1, data2), format = 'stylish');
};

export default gendiff;
