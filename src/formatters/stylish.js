import _ from 'lodash';

const indent = 4;

const makeIndent = (depth, extra = 0) => ' '.repeat(indent * depth - extra);

const stringify = (value, depth) => {
  if (!_.isObject(value) || value === null) {
    return String(value);
  }

  const indent = makeIndent(depth);
  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${makeIndent(depth - 1)}}`,
  ].join('\n');
};

const formatDiff = (diffTree) => {
  const iter = (nodes, depth) => {
    const indent = makeIndent(depth, 2);

    return nodes.flatMap((node) => {
      switch (node.type) {
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'removed':
          return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
            `${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
          ];
        case 'unchanged':
          return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'nested':
          return [
            `${indent}  ${node.key}: {`,
            ...iter(node.children, depth + 1),
            `${makeIndent(depth)}}`,
          ];
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });
  };

  const lines = iter(diffTree.children, 1);
  return ['{', ...lines, '}'].join('\n');
};

export default formatDiff;