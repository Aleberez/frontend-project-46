import _ from 'lodash';
import parse from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

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
