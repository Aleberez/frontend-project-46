import stylish from './stylish.js';
import makeFlat from './flat.js';

export default function formatter(tree, format) {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'flat':
      return makeFlat(tree);
    default:
      throw new Error('Uncorrect data');
  }
}
