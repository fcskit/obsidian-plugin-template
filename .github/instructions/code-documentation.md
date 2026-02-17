# Code Documentation

**Generic documentation standards for all TypeScript projects.**

---

## JSDoc Comments

**Document public APIs with JSDoc:**

```typescript
/**
 * Fetches a record by its unique identifier.
 * 
 * @param id - The unique identifier of the record
 * @returns Promise resolving to the record, or undefined if not found
 * @throws {Error} If the API request fails
 * 
 * @example
 * ```typescript
 * const record = await api.getRecordById('abc-123');
 * if (record) {
 *   console.log(record.title);
 * }
 * ```
 */
async getRecordById(id: string): Promise<Record | undefined> {
    // Implementation
}
```

**Document complex logic with inline comments:**

```typescript
// ✅ GOOD: Explain WHY, not WHAT
function calculateScore(metrics: Metrics): number {
    // Multiply by 0.7 because we weight recent activity more heavily
    // than historical data (based on user research from 2025-11)
    const recentScore = metrics.recent * 0.7;
    
    // Cap historical score at 30% to prevent old data from
    // dominating the calculation
    const historicalScore = Math.min(metrics.historical * 0.3, 30);
    
    return recentScore + historicalScore;
}
```

---

## Function Documentation

**Every non-trivial function should have:**

1. Brief description of what it does
2. Parameter descriptions
3. Return value description
4. Possible errors/exceptions
5. Example usage (if complex)

```typescript
/**
 * Validates note metadata against template requirements.
 * 
 * Checks required fields, data types, and value constraints
 * defined in the template. Returns detailed validation errors
 * for each field that fails validation.
 * 
 * @param metadata - The metadata object to validate
 * @param template - The template defining requirements
 * @returns Array of validation errors (empty if valid)
 * 
 * @example
 * ```typescript
 * const errors = validateMetadata(note.metadata, template);
 * if (errors.length > 0) {
 *   console.error('Validation failed:', errors);
 * }
 * ```
 */
function validateMetadata(
    metadata: NoteMetadata,
    template: Template
): ValidationError[] {
    // Implementation
}
```

---

## Comment Best Practices

### Explain WHY, not WHAT

```typescript
// ❌ BAD: Obvious what the code does
// Increment counter by 1
counter++;

// ✅ GOOD: Explains the reason
// Reset after 10 iterations to prevent memory buildup
if (counter >= 10) {
    counter = 0;
    this.clearCache();
}
```

### Document Edge Cases

```typescript
/**
 * Parses date string with timezone handling.
 * 
 * Note: Returns null for invalid dates instead of throwing,
 * because user input may be malformed. Caller should handle null.
 */
function parseDate(dateStr: string): Date | null {
    // Handle empty string edge case
    if (!dateStr || dateStr.trim() === '') {
        return null;
    }
    
    // Try parsing, return null on failure
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
}
```

### Document Complex Algorithms

```typescript
/**
 * Implements binary search on sorted array.
 * 
 * Time complexity: O(log n)
 * Space complexity: O(1)
 * 
 * @param arr - Sorted array to search
 * @param target - Value to find
 * @returns Index of target, or -1 if not found
 */
function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}
```

---

## When to Add Comments

**Add comments for:**
- ✅ Public API functions (JSDoc required)
- ✅ Complex algorithms or logic
- ✅ Non-obvious workarounds or hacks
- ✅ Performance optimizations
- ✅ Edge case handling
- ✅ Business logic decisions

**Don't add comments for:**
- ❌ Obvious code that's self-explanatory
- ❌ Restating what the code does
- ❌ Outdated comments (update or remove)
- ❌ Commented-out code (delete it, use git)

---

## Documentation Maintenance

**Keep comments synchronized with code:**

```typescript
// ❌ BAD: Outdated comment
// Returns user by ID (comment says ID, but code uses email!)
function getUser(email: string): User {
    return this.users.find(u => u.email === email);
}

// ✅ GOOD: Accurate comment
// Returns user by email address
function getUser(email: string): User {
    return this.users.find(u => u.email === email);
}
```

**When changing code, update related comments immediately.**
