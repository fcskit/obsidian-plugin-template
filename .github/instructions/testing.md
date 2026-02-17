# Testing and Validation

**Generic testing guidelines for TypeScript projects.**

---

## Manual Testing Checklist

Before committing code, verify:

- [ ] Code builds without errors (`npm run build`)
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] All features work as expected
- [ ] No console errors or warnings
- [ ] Tested edge cases and error scenarios
- [ ] Performance is acceptable
- [ ] Works in target environments (browsers/Node.js)

---

## Code Review Checklist

Before finalizing changes:

- [ ] No files exceed size limits (500 lines max for source files)
- [ ] Code follows single responsibility principle
- [ ] No duplicated code (extracted to utilities)
- [ ] Strong typing (no `any` types without justification)
- [ ] Error handling present and appropriate
- [ ] JSDoc comments on public APIs
- [ ] Meaningful variable/function names
- [ ] Documentation updated if needed
- [ ] Tests added/updated for new functionality

---

## Unit Testing Best Practices

### Test File Organization

```
src/
├── parsers/
│   ├── CSVParser.ts
│   └── CSVParser.test.ts    # Co-located with source
└── utils/
    ├── validation.ts
    └── validation.test.ts
```

**Benefits of co-location:**
- Easy to find related tests
- Tests move with code when refactoring
- Clear which code is tested

### Test Structure

```typescript
describe('CSVParser', () => {
    describe('parse()', () => {
        it('should parse valid CSV data', () => {
            const input = 'a,b,c\n1,2,3';
            const result = parser.parse(input);
            
            expect(result.headers).toEqual(['a', 'b', 'c']);
            expect(result.rows).toEqual([[1, 2, 3]]);
        });
        
        it('should handle empty input', () => {
            const result = parser.parse('');
            
            expect(result.headers).toEqual([]);
            expect(result.rows).toEqual([]);
        });
        
        it('should throw on malformed CSV', () => {
            const invalid = 'a,b\n1,2,3'; // Mismatched columns
            
            expect(() => parser.parse(invalid)).toThrow();
        });
    });
});
```

### What to Test

**Test:**
- ✅ Happy path (normal operation)
- ✅ Edge cases (empty, null, undefined)
- ✅ Error conditions (invalid input)
- ✅ Boundary values (min, max, zero)
- ✅ Integration points (APIs, file I/O)

**Don't test:**
- ❌ Third-party libraries (assume they work)
- ❌ Language features (assume TypeScript works)
- ❌ Trivial getters/setters

---

## Integration Testing

### Test Entire Workflows

```typescript
describe('Data Import Pipeline', () => {
    it('should parse, process, and plot CSV data', async () => {
        // Arrange: Set up test data
        const csvData = loadTestFixture('sample.csv');
        
        // Act: Run through pipeline
        const parsed = await parser.parse(csvData);
        const processed = await processor.process(parsed);
        const plot = await plotter.createPlot(processed);
        
        // Assert: Verify end result
        expect(plot.type).toBe('line');
        expect(plot.data.length).toBe(100);
        expect(plot.title).toBe('Test Dataset');
    });
});
```

---

## Test Coverage

**Aim for:**
- **80%+ coverage** for critical business logic
- **100% coverage** for parsers and data transformations
- **Lower coverage OK** for UI code (manual testing often better)

**Check coverage:**
```bash
npm run test -- --coverage
```

---

## Mocking and Stubbing

```typescript
// ✅ GOOD: Mock external dependencies
describe('DataFetcher', () => {
    it('should retry on network failure', async () => {
        const mockApi = {
            fetch: jest.fn()
                .mockRejectedValueOnce(new Error('Network error'))
                .mockResolvedValueOnce({ data: 'success' })
        };
        
        const fetcher = new DataFetcher(mockApi);
        const result = await fetcher.fetchWithRetry();
        
        expect(mockApi.fetch).toHaveBeenCalledTimes(2);
        expect(result.data).toBe('success');
    });
});
```

---

## Test Fixtures

**Organize test data:**

```
tests/
├── fixtures/
│   ├── valid-data.csv
│   ├── invalid-data.csv
│   └── large-dataset.csv
└── integration/
    └── pipeline.test.ts
```

**Load fixtures:**
```typescript
import { readFileSync } from 'fs';
import { join } from 'path';

const fixture = readFileSync(
    join(__dirname, 'fixtures', 'valid-data.csv'),
    'utf-8'
);
```

---

## Async Testing

```typescript
// ✅ GOOD: Properly test async code
it('should fetch data asynchronously', async () => {
    const result = await fetchData();
    expect(result).toBeDefined();
});

// ✅ GOOD: Test promise rejection
it('should handle errors', async () => {
    await expect(fetchInvalidData()).rejects.toThrow('Not found');
});
```

---

## Snapshot Testing

```typescript
// ✅ GOOD: Snapshot complex objects
it('should generate correct plot configuration', () => {
    const config = generatePlotConfig(testData);
    expect(config).toMatchSnapshot();
});
```

**When to use snapshots:**
- Complex object structures
- Generated HTML/markup
- API response shapes
- Configuration objects

**When NOT to use:**
- Simple values (use explicit assertions)
- Frequently changing data
- Non-deterministic output

---

## Performance Testing

```typescript
it('should parse large files in under 1 second', () => {
    const largeFile = generateTestData(10000);
    
    const start = performance.now();
    parser.parse(largeFile);
    const duration = performance.now() - start;
    
    expect(duration).toBeLessThan(1000);
});
```

---

## Test-Driven Development (TDD)

**Workflow:**
1. **Red**: Write failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve code while keeping tests passing

```typescript
// 1. RED: Write test first
it('should validate email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid')).toBe(false);
});

// 2. GREEN: Implement minimal solution
function validateEmail(email: string): boolean {
    return email.includes('@');
}

// 3. REFACTOR: Improve implementation
function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
```

---

## Continuous Integration

**Run tests automatically:**
- On every commit
- Before merging PRs
- On scheduled builds

**Fail fast:**
- Block merges if tests fail
- Notify team of failures
- Track test trends over time
