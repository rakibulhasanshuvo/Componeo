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

  const repository = new ComponentsRepository(mockSupabase as any);
  const result = await repository.getPublicComponents();

  expect(result).toEqual(mockData);
});

test('ComponentsRepository.getComponentById - happy path', async () => {
  const mockData = { id: '1', title: 'Test Component', is_public: true };
  let eqCalls: string[] = [];

  const mockQuery: any = {
    select: function() { return this; },
    eq: function(column: string, value: any) {
      eqCalls.push(`${column}=${value}`);
      return this;
    },
    limit: function(count: number) {
      return this;
    },
    single: function() {
      return Promise.resolve({ data: mockData, error: null });
    }
  };

  const mockSupabase = {
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase as any);
  const result = await repository.getComponentById('1');

  expect(result).toEqual(mockData);
  expect(eqCalls).toContain('id=1');
});

test('ComponentsRepository.getComponentById - error path', async () => {
  const mockError = { message: 'Database failure' };

  const mockQuery: any = {
    select: function() { return this; },
    eq: function(column: string, value: any) {
      return this;
    },
    limit: function(count: number) {
      return this;
    },
    single: function() {
      return Promise.resolve({ data: null, error: mockError });
    }
  };

  const mockSupabase = {
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase as any);
  const result = await repository.getComponentById('1');

  expect(result).toBeNull();
});

test('ComponentsRepository.getComponentsByAuthor - happy path', async () => {
  const mockData = [{ id: '1', title: 'Test Component', author_id: 'user123' }];
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

  const repository = new ComponentsRepository(mockSupabase as any);
  const result = await repository.getComponentsByAuthor('user123');

  expect(result).toEqual(mockData);
  expect(eqCalls).toContain('author_id=user123');
});

test('ComponentsRepository.getComponentsByAuthor - error path', async () => {
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
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase as any);

  await expect(repository.getComponentsByAuthor('user123')).rejects.toThrow('Identity-bound persistence retrieval failed.');
});

test('ComponentsRepository.createComponent - happy path', async () => {
  const mockComponent = { title: 'Test Component', category: 'Buttons', code: 'test' };
  const mockData = { id: '1', ...mockComponent };

  const mockQuery: any = {
    insert: function(data: any) {
      return this;
    },
    select: function() {
      return this;
    },
    single: function() {
      return Promise.resolve({ data: mockData, error: null });
    }
  };

  const mockSupabase = {
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase as any);
  const result = await repository.createComponent(mockComponent as any);

  expect(result).toEqual(mockData);
});

test('ComponentsRepository.createComponent - error path', async () => {
  const mockComponent = { title: 'Test Component', category: 'Buttons', code: 'test' };
  const mockError = { message: 'Database failure' };

  const mockQuery: any = {
    insert: function(data: any) {
      return this;
    },
    select: function() {
      return this;
    },
    single: function() {
      return Promise.resolve({ data: null, error: mockError });
    }
  };

  const mockSupabase = {
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase as any);

  await expect(repository.createComponent(mockComponent as any)).rejects.toThrow('Atomic synthesis injection failed: Database failure');
});

test('ComponentsRepository.updateComponent - happy path', async () => {
  const mockUpdates = { title: 'Updated Component' };
  const mockData = { id: '1', title: 'Updated Component', author_id: 'user123' };
  let eqCalls: string[] = [];

  const mockQuery: any = {
    update: function(data: any) {
      return this;
    },
    eq: function(column: string, value: any) {
      eqCalls.push(`${column}=${value}`);
      return this;
    },
    select: function() {
      return this;
    },
    single: function() {
      return Promise.resolve({ data: mockData, error: null });
    }
  };

  const mockSupabase = {
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase as any);
  const result = await repository.updateComponent('1', mockUpdates as any, 'user123');

  expect(result).toEqual(mockData);
  expect(eqCalls).toContain('id=1');
  expect(eqCalls).toContain('author_id=user123');
});

test('ComponentsRepository.updateComponent - error path', async () => {
  const mockUpdates = { title: 'Updated Component' };
  const mockError = { message: 'Database failure' };

  const mockQuery: any = {
    update: function(data: any) {
      return this;
    },
    eq: function(column: string, value: any) {
      return this;
    },
    select: function() {
      return this;
    },
    single: function() {
      return Promise.resolve({ data: null, error: mockError });
    }
  };

  const mockSupabase = {
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase as any);

  await expect(repository.updateComponent('1', mockUpdates as any, 'user123')).rejects.toThrow('Structural update to atomic unit failed.');
});

test('ComponentsRepository.deleteComponent - happy path', async () => {
  let eqCalls: string[] = [];

  const mockQuery: any = {
    delete: function() {
      return this;
    },
    eq: function(column: string, value: any) {
      eqCalls.push(`${column}=${value}`);
      return this;
    },
    then: function(onfulfilled: any) {
      return Promise.resolve({ error: null }).then(onfulfilled);
    }
  };

  const mockSupabase = {
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase as any);
  await repository.deleteComponent('1', 'user123');

  expect(eqCalls).toContain('id=1');
  expect(eqCalls).toContain('author_id=user123');
});

test('ComponentsRepository.deleteComponent - error path', async () => {
  const mockError = { message: 'Database failure' };

  const mockQuery: any = {
    delete: function() {
      return this;
    },
    eq: function(column: string, value: any) {
      return this;
    },
    then: function(onfulfilled: any) {
      return Promise.resolve({ error: mockError }).then(onfulfilled);
    }
  };

  const mockSupabase = {
    from: (table: string) => mockQuery
  };

  const repository = new ComponentsRepository(mockSupabase as any);

  await expect(repository.deleteComponent('1', 'user123')).rejects.toThrow('Decommissioning of atomic unit failed.');
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

  const repository = new ComponentsRepository(mockSupabase as any);

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

  const repository = new ComponentsRepository(mockSupabase as any);
  const result = await repository.getPublicComponents('Buttons');

  expect(result).toEqual(mockData);
  expect(eqCalls).toContain('category=Buttons');
});
