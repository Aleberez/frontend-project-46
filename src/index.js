import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';
import parse from './parsers.js';

const resolvePath = (filePath) => path.resolve(process.cwd(), filePath);

const getExtension = (filename) => path.extname(filename).slice(1);

const gendiff = (filepath1, filepath2) => {
  const file1Content = readFileSync(resolvePath(filepath1), 'utf-8');
  const file2Content = readFileSync(resolvePath(filepath2), 'utf-8');
  
  const data1 = parse(file1Content, getExtension(filepath1));
  const data2 = parse(file2Content, getExtension(filepath2));

  const keys = _.sortBy([...new Set([...Object.keys(data1), ...Object.keys(data2)])]);
  const result = keys.map((key) => {
    if (!Object.keys(data2).includes(key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!Object.keys(data1).includes(key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  }).join('\n');

  return `{\n${result}\n}`;
};

export default gendiff;
