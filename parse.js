const fs = require('fs');
const path = require('path');

const parse = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(data);
};

module.exports = parse;
