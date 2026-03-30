import { test, expect } from 'vitest';
import assert from 'node:assert';
import { ComponentsRepository } from './componentsRepository';

test('ComponentsRepository.getPublicComponents - happy path', async () => {
  const mockData = [{ id: '1', title: 'Test Component', is_public: true }];
  const mockQuery: any = {
    select: function() { return this; },
    eq: function(column: string, value: any) {
      return this;
    },
    order: function(column: string, options: any) {
      return this;
    },
    then: function(onfulfilled: any) {
      return Promise.resolve({ data: mockData, error: null }).then(onfulfilled);
    }
  };

  const mockSupabase = {
    from: (table: string) => {
      assert.strictEqual(table, 'components');
      return mockQuery;
    }
  };

  const repository = new ComponentsRepository(mockSupabase);
  const result = await repository.getPublicComponents();

  expect(result).toEqual(mockData);
});

test('ComponentsRepository.getPublicComponents - error path', async () => {
  const mockError = { message: 'Database failure' };
  const mockQuery: any = {
    select: function() { return this; },
    eq: function(column: string, value: any) {
      return this;
    },
    order: function(column: string, options: any) {
      return this;
    },
    then: function(onfulfilled: any) {
      return Promise.resolve({ data: null, error: mockError }).then(onfulfilled);
    }
  };

  const mockSupabase = {
    from: (table: string) => {
      return mockQuery;
    }
  };

  const repository = new ComponentsRepository(mockSupabase);

  await expect(repository.getPublicComponents()).rejects.toThrow('Architectural failure in registry fetch: Database failure');
});

test('ComponentsRepository.getPublicComponents - with category filter', async () => {
  const mockData = [{ id: '1', title: 'Button Component', category: 'Buttons', is_public: true }];
  let eqCalls: string[] = [];

  const mockQuery: any = {
    select: function() { return this; },
    eq: function(column: string, value: any) {
      eqCalls.push(`${column}=${value}`);
      return this;
    },
    order: function(column: string, options: any) {
      return this;
    },
    then: function(onfulfilled: any) {
      return Promise.resolve({ data: mockData, error: null }).then(onfulfilled);
    }
  };

  const mockSupabase = {
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase);
  const result = await repository.getPublicComponents('Buttons');

  expect(result).toEqual(mockData);
  expect(eqCalls).toContain('category=Buttons');
});
