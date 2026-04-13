import { test, mock, beforeEach } from 'node:test';
import assert from 'node:assert';

// State for mocks
const state = {
  existsSync: (path: string) => false,
  readFileSync: (path: string, encoding: string) => '',
  mkdirSync: (path: string, options?: any) => {},
  writeFileSync: (path: string, content: string, encoding: string) => {},
};

// Mock the fs module
mock.module('node:fs', {
  namedExports: {
    existsSync: (path: string) => state.existsSync(path),
    readFileSync: (path: string, encoding: string) => state.readFileSync(path, encoding),
    mkdirSync: (path: string, options?: any) => state.mkdirSync(path, options),
    writeFileSync: (path: string, content: string, encoding: string) => state.writeFileSync(path, content, encoding),
  }
});

// DELAYED IMPORT
const { getActContent, saveActContent } = await import('./acts-content.ts');

beforeEach(() => {
  // Reset state before each test
  state.existsSync = (path: string) => false;
  state.readFileSync = (path: string, encoding: string) => '';
  state.mkdirSync = (path: string, options?: any) => {};
  state.writeFileSync = (path: string, content: string, encoding: string) => {};
});

test('getActContent returns content when file exists', (t) => {
  state.existsSync = (path: string) => {
    if (path.includes('existing')) return true;
    return false;
  };
  state.readFileSync = () => '  Hello World  ';

  const content = getActContent('story1', 'chapter1', 'existing');

  assert.strictEqual(content, 'Hello World');
});

test('getActContent returns null when file is empty', (t) => {
  state.existsSync = () => true;
  state.readFileSync = () => '   ';

  const content = getActContent('story1', 'chapter1', 'empty');

  assert.strictEqual(content, null);
});

test('getActContent returns null when file does not exist', (t) => {
  state.existsSync = () => false;

  const content = getActContent('story1', 'chapter1', 'missing');

  assert.strictEqual(content, null);
});

test('saveActContent creates directory and writes file', (t) => {
  let mkdirCalled = 0;
  let writeCalled = 0;
  let mkdirArgs: any[] = [];
  let writeArgs: any[] = [];

  state.mkdirSync = (path: string, options?: any) => {
    mkdirCalled++;
    mkdirArgs = [path, options];
  };
  state.writeFileSync = (path: string, content: string, encoding: string) => {
    writeCalled++;
    writeArgs = [path, content, encoding];
  };

  saveActContent('story1', 'chapter1', 'section1', 'new content');

  assert.strictEqual(mkdirCalled, 1);
  assert.strictEqual(writeCalled, 1);

  assert.ok(mkdirArgs[0].includes('story1'));
  assert.ok(mkdirArgs[0].includes('chapter1'));
  assert.deepStrictEqual(mkdirArgs[1], { recursive: true });

  assert.ok(writeArgs[0].includes('section1.txt'));
  assert.strictEqual(writeArgs[1], 'new content');
  assert.strictEqual(writeArgs[2], 'utf-8');
});
