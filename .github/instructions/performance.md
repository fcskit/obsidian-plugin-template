# Performance Best Practices

**Generic performance optimization patterns for TypeScript projects.**

---

## Avoid Unnecessary Re-renders

```typescript
// ❌ BAD: Creating new objects in render loop
class MyComponent {
    render() {
        this.containerEl.createEl('div', {
            cls: ['class1', 'class2'] // New array every render!
        });
    }
}

// ✅ GOOD: Reuse constant arrays/objects
class MyComponent {
    private readonly classes = ['class1', 'class2'];
    
    render() {
        this.containerEl.createEl('div', {
            cls: this.classes // Reuse existing array
        });
    }
}
```

---

## Cache Expensive Computations

```typescript
// ✅ GOOD: Cache computed values
class DataProcessor {
    private cache = new Map<string, ProcessedData>();
    
    process(id: string, data: RawData): ProcessedData {
        if (this.cache.has(id)) {
            return this.cache.get(id)!;
        }
        
        const processed = this.expensiveComputation(data);
        this.cache.set(id, processed);
        return processed;
    }
    
    clearCache() {
        this.cache.clear();
    }
}
```

**When to use caching:**
- ✅ Expensive computations that are called repeatedly
- ✅ API responses that don't change often
- ✅ Derived data from large datasets

**When NOT to cache:**
- ❌ Simple operations (overhead not worth it)
- ❌ Data that changes frequently
- ❌ Memory-constrained environments

---

## Debounce Frequent Operations

```typescript
// ✅ GOOD: Debounce search as user types
class SearchComponent {
    private searchDebounce: number | null = null;
    
    onSearchInput(query: string) {
        if (this.searchDebounce) {
            window.clearTimeout(this.searchDebounce);
        }
        
        this.searchDebounce = window.setTimeout(() => {
            this.performSearch(query);
        }, 300); // Wait 300ms after user stops typing
    }
}
```

**Common use cases:**
- Search input
- Auto-save
- Window resize handlers
- Scroll events
- API calls triggered by user input

---

## Throttle High-Frequency Events

```typescript
// ✅ GOOD: Throttle scroll handler
class ScrollHandler {
    private lastRun = 0;
    private throttleMs = 100;
    
    onScroll() {
        const now = Date.now();
        if (now - this.lastRun < this.throttleMs) {
            return; // Skip this call
        }
        
        this.lastRun = now;
        this.handleScrollEvent();
    }
}
```

**Debounce vs Throttle:**
- **Debounce**: Wait for silence, then execute once
- **Throttle**: Execute at most once per time period

---

## Lazy Loading

```typescript
// ✅ GOOD: Load heavy resources only when needed
class HeavyComponent {
    private data: LargeDataset | null = null;
    
    async loadData() {
        if (this.data) {
            return this.data; // Already loaded
        }
        
        this.data = await this.fetchLargeDataset();
        return this.data;
    }
}
```

---

## Efficient Array Operations

```typescript
// ❌ BAD: Multiple passes over array
const filtered = items.filter(item => item.active);
const mapped = filtered.map(item => item.name);
const sorted = mapped.sort();

// ✅ GOOD: Single pass with reduce
const result = items
    .filter(item => item.active)
    .map(item => item.name)
    .sort();

// ✅ EVEN BETTER: Use for loop if performance critical
const result: string[] = [];
for (const item of items) {
    if (item.active) {
        result.push(item.name);
    }
}
result.sort();
```

---

## Avoid Memory Leaks

```typescript
// ❌ BAD: Event listener not cleaned up
class Component {
    constructor() {
        window.addEventListener('resize', this.onResize);
    }
}

// ✅ GOOD: Clean up event listeners
class Component {
    constructor() {
        window.addEventListener('resize', this.onResize);
    }
    
    destroy() {
        window.removeEventListener('resize', this.onResize);
    }
}
```

**Common memory leak sources:**
- Event listeners not removed
- Timers (setTimeout, setInterval) not cleared
- Large objects in closures
- DOM references kept after element removed
- Cache that grows unbounded

---

## Batch DOM Operations

```typescript
// ❌ BAD: Multiple DOM manipulations
for (const item of items) {
    container.appendChild(createItem(item));
    // Causes reflow on each iteration!
}

// ✅ GOOD: Batch DOM updates
const fragment = document.createDocumentFragment();
for (const item of items) {
    fragment.appendChild(createItem(item));
}
container.appendChild(fragment);
// Single reflow
```

---

## Use Appropriate Data Structures

```typescript
// ❌ BAD: Linear search in array
const found = items.find(item => item.id === targetId);
// O(n) time complexity

// ✅ GOOD: Use Map for lookups
const itemsMap = new Map(items.map(item => [item.id, item]));
const found = itemsMap.get(targetId);
// O(1) time complexity
```

**Data structure choices:**
- **Array**: Ordered collection, index access
- **Set**: Unique values, fast has() checks
- **Map**: Key-value pairs, fast lookups
- **WeakMap**: Garbage-collectable keys

---

## Measure Before Optimizing

```typescript
// ✅ GOOD: Measure performance
console.time('processData');
const result = processData(largeDataset);
console.timeEnd('processData');
// Output: processData: 234.567ms
```

**Performance optimization rules:**
1. **Measure first** - Don't guess where bottlenecks are
2. **Optimize hot paths** - Focus on code that runs frequently
3. **Profile in production** - Dev mode is often slower
4. **Test impact** - Verify optimizations actually help

**Tools:**
- Chrome DevTools Performance tab
- `console.time()` / `console.timeEnd()`
- `performance.now()` for precise timing
- Memory profiler for leak detection
