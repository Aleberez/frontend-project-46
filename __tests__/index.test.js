import gendiff from '../src/index.js';
import result from '../__fixtures__/result.js';

test('check json stylish', () => {
    expect(gendiff('file1.json', 'file2.json')).toEqual(result);
  });