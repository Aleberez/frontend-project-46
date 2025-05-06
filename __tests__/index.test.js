import gendiff from '../src/index.js';
import result from '../__fixtures__/result.js';

test('check json stylish', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(result);
});
