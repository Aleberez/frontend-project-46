#!/usr/bin/env node

const { program } = require('commander');
const parse = require('./parse.js');


const gendiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();;
  const result = keys.map((key) => {
    if (!data2.hasOwnProperty(key)) {
      return `- ${key}: ${data1[key]}`;
    }
    if (!data1.hasOwnProperty(key)) {
      return `+ ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
    }
    return `  ${key}: ${data1[key]}`;
  }).join('\n');

  return result;
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-V, --version', 'output the version number')
  .action((filepath1, filepath2) => {
    const diff = gendiff(filepath1, filepath2);
    console.log(diff);
  });

program.parse();
