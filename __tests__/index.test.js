import gendiff from '../src/index.js';
import result from '../__fixtures__/result.js';
import resultFlat from '../__fixtures__/resultPlain.js';

test('check json stylish', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toEqual(result);
});

test('check yaml stylish', () => {
  expect(gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'stylish')).toEqual(result);
});

test('check yml stylish', () => {
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish')).toEqual(result);
});

test('check json flat', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'flat')).toEqual(resultFlat);
});

test('check yaml flat', () => {
  expect(gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'flat')).toEqual(resultFlat);
});

test('check yml flat', () => {
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'flat')).toEqual(resultFlat);
});