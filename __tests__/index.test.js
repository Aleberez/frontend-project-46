import gendiff from '../src/index.js';
import result from '../__fixtures__/result.js';

test('check json stylish', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toEqual(result);
});

test('check yaml stylish', () => {
  expect(gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(result);
});

test('check yml stylish', () => {
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(result);
});
