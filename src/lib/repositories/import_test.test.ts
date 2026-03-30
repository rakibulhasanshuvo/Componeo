import test from 'node:test';
import assert from 'node:assert';
import { MyValue } from './type_test.ts';
import type { MyInterface } from './type_test.ts';

test('type test', () => {
  const x: MyInterface = { a: 'hello' };
  assert.strictEqual(MyValue, 42);
  assert.strictEqual(x.a, 'hello');
});
