import stylish from './stylish.js';
import makeFlat from './flat.js';
import stringify from './stringifyJSON.js';

export default function formatter(tree, format) {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'flat':
      return makeFlat(tree);
    case 'json':
      return stringify(tree);
    default:
      throw new Error('Uncorrect format! Please use "stylish", "flat" or "json"');
  }
}
