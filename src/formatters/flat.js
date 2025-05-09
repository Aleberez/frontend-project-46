import _ from 'lodash';

const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const makeFlat = (diffTree) => {
  const buildLines = (nodes, parentPath = []) => {
    return nodes.flatMap((node) => {
      const currentPath = [...parentPath, node.key].join('.');
      
      switch (node.type) {
        case 'nested':
          return buildLines(node.children, [...parentPath, node.key]);
          
        case 'added':
          return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
          
        case 'removed':
          return `Property '${currentPath}' was removed`;
          
        case 'changed':
          return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
          
        case 'unchanged':
          return null;
          
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });
  };

  const lines = buildLines(diffTree.children);
  return lines.filter(line => line !== null).join('\n');
};

export default makeFlat;