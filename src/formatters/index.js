import stylish from './stylish.js';

export default function formatter(tree, format) {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error('Uncorrect data');
  }
}