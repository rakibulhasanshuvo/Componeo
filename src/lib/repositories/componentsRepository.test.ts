import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

// Workaround for Node.js test runner limitations with TypeScript parameter properties:
// We read the original source and refactor it in-memory to be pure JavaScript compatible.

const repoPath = path.resolve('src/lib/repositories/componentsRepository.ts');
let source = fs.readFileSync(repoPath, 'utf8');

// Use a simple, non-brittle approach to handle the problematic constructor
// and remove the imports and types that cause resolution issues in this environment.
source = source
  .replace(/import\s+[^;]+from\s+'[^']+';/g, '') // Remove all imports
  .replace(/export\s+type\s+[^;]+;/g, '')       // Remove all type exports
  .replace(/constructor\(private\s+readonly\s+supabase:\s+any\)\s*\{\}/,
           'constructor(supabase) { this.supabase = supabase; }')
  .replace(/:\s*Promise<[^>]+>/g, '')           // Remove Promise return types
  .replace(/:\s*[A-Z][A-Za-z0-9<>|[\] |]+/g, '') // Remove other type annotations
  .replace(/\?:\s*/g, ':')                      // Normalize optional markers
  .replace(/:\s*[a-z]+/g, '')                   // Remove lowercase type annotations (string, any, void)
  .replace(/,\s*\{\s*ascending\s*\}\s*/g, ', { ascending: false }'); // Fix destructured object that lost its value

// Convert to data URI for importing
const base64Source = Buffer.from(source).toString('base64');
const dataUri = `data:text/javascript;base64,${base64Source}`;

// We need to use a dynamic import because we're using a data URI
const { ComponentsRepository } = await import(dataUri);

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

  assert.deepStrictEqual(result, mockData);
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

  await assert.rejects(
    async () => {
      await repository.getPublicComponents();
    },
    {
      name: 'Error',
      message: 'Architectural failure in registry fetch: Database failure'
    }
  );
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

  assert.deepStrictEqual(result, mockData);
  assert.ok(eqCalls.includes('category=Buttons'));
});
