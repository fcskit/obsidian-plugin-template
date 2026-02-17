# Logging System

**Centralized logging with component filtering and debug code elimination.**

---

## Overview

This template includes a sophisticated centralized logging system located in `src/utils/Logger.ts`.

**CRITICAL: Never use console.log, console.debug, console.warn, or console.error directly!**

---

## How to Use the Logger

### 1. Import the Logger

```typescript
import { createLogger } from '../utils/Logger';
```

### 2. Create a Component-Specific Logger

```typescript
export class MyComponent {
  private logger = createLogger('componentName');
  
  someMethod() {
    this.logger.debug('Method called', { param1, param2 });
  }
}
```

### 3. Use Logger Methods

```typescript
// Debug messages (removed in production)
this.logger.debug('Processing data', { data, computed });

// Informational messages (kept in production)
this.logger.info('Operation completed successfully');

// Warning messages (kept in production)
this.logger.warn('Deprecated feature used', { feature });

// Error messages (kept in production)
this.logger.error('Operation failed', error);
```

---

## Available Component Names

**Use these component names for `createLogger()`:**

- `main` - Plugin entry point
- `modal` - Modal dialogs
- `api` - API calls
- `settings` - Settings management
- `ui` - General UI components
- `events` - Event handling
- `general` - General/uncategorized

**Example:**
```typescript
// In a modal class
private logger = createLogger('modal');

// In settings
private logger = createLogger('settings');

// In an API service
private logger = createLogger('api');
```

---

## Logger Features

### 1. Component-Based Filtering

**Different log levels per component:**

```typescript
// Show debug for 'modal' component only
logger.setComponentLevel('modal', 'debug');

// Show only errors for 'api' component
logger.setComponentLevel('api', 'error');
```

**Benefits:**
- Focus on specific components during debugging
- Reduce noise from other parts of the system
- Granular control over logging output

### 2. Tag-Based Filtering (Advanced)

**For complex components with lots of debug output:**

```typescript
// Show only specific debug categories
logger.setComponentLevel('ui', 'debug', ['validation', 'state']);

// Use tags in debug calls
this.logger.debug('Field valid', { field }, ['validation']);  // ✅ Shows
this.logger.debug('Rendering', { time }, ['rendering']);      // ❌ Hidden
```

**Benefits:**
- Reduce noise from complex components
- Focus on specific aspects (validation, rendering, state, etc.)
- No need to elevate debug to warn
- Keep debug semantics correct

**Common tag examples:**
- `['validation']` - Form/input validation
- `['rendering']` - UI rendering logic
- `['state']` - State management
- `['api']` - API interactions
- `['lifecycle']` - Component lifecycle events

### 3. File Logging

**Optional logging to file:**

```typescript
// Enable file logging (writes to debug-log.txt in vault root)
logger.setFileLogging(true);

// Disable file logging
logger.setFileLogging(false);
```

**When to use:**
- Debugging issues that happen over time
- Capturing logs from users
- Analyzing patterns in behavior

### 4. Structured Output

**Consistent formatting with timestamps:**

```
[2025-02-17 10:30:45] [modal] [DEBUG] Method called { param1: 'value', param2: 42 }
[2025-02-17 10:30:46] [api] [INFO] Data fetched successfully
[2025-02-17 10:30:47] [ui] [WARN] Deprecated feature { feature: 'oldAPI' }
[2025-02-17 10:30:48] [main] [ERROR] Failed to load { error: 'Network error' }
```

### 5. Buffered Writing

**Efficient file operations:**
- Logs batched in memory
- Written to file periodically
- Minimizes I/O overhead
- Automatically flushed on error

---

## Debug Code Elimination (CRITICAL)

### Production Builds

**In production builds, ALL `debug()` calls are completely removed from the bundle:**

```typescript
// Development: Full debug output
this.logger.debug('Processing data', { data, computed });

// Production: This entire line doesn't exist in the bundle!
// Zero runtime overhead, smaller bundle size
```

**What gets removed:**
- ✅ All `logger.debug()` calls
- ✅ Code wrapped in `// DEBUG_START` / `// DEBUG_END` markers
- ✅ Zero impact on production performance

**What stays in production:**
- ✅ `logger.info()` calls
- ✅ `logger.warn()` calls
- ✅ `logger.error()` calls

### Automatic Elimination

**How it works:**

1. **Development mode** (`npm run dev`):
   - All logger calls remain
   - Full debugging available

2. **Production mode** (`npm run build`):
   - esbuild processes code
   - Dead code elimination removes debug calls
   - Result: No debug code in final bundle

**Benefits:**
- Debug freely during development
- Zero performance cost in production
- Automatic protection (no manual cleanup needed)
- Smaller bundle size

---

## Manual Debug Cleanup (Optional)

**For stable features, permanently remove debug code from source:**

### Wrap Debug Code

```typescript
// DEBUG_START
this.logger.debug('Complex state', { details, computed, intermediate });
// DEBUG_END

// This code between markers can be removed when feature is stable
```

### Run Cleanup Script

```bash
# Remove all debug code from source files
node scripts/clean-debug-code.mjs --all

# Remove debug code from specific file
node scripts/clean-debug-code.mjs src/ui/MyComponent.ts
```

### When to Use Manual Cleanup

**Use manual cleanup when:**
- ✅ Feature is stable and well-tested
- ✅ Debug output no longer needed
- ✅ Want to improve source code readability
- ✅ Reducing source code maintenance burden

**Don't use manual cleanup when:**
- ❌ Feature still in active development
- ❌ Debug output useful for future debugging
- ❌ Might need to debug again soon

**Remember:** Automatic elimination already protects production users, so manual cleanup is optional and only for source code cleanliness.

---

## Example Usage

### Basic Component Logging

```typescript
import { createLogger } from '../utils/Logger';

export class DataProcessor {
  private logger = createLogger('api');
  
  async fetchData(id: string) {
    this.logger.debug('Fetching data', { id });
    
    try {
      const data = await fetch(`/api/data/${id}`);
      this.logger.info('Data fetched successfully', { id, size: data.length });
      return data;
    } catch (error) {
      this.logger.error('Failed to fetch data', error);
      throw error;
    }
  }
}
```

### Modal with Tag-Based Filtering

```typescript
import { createLogger } from '../utils/Logger';

export class ComplexModal extends Modal {
  private logger = createLogger('modal');
  
  onOpen() {
    this.logger.debug('Modal opening', null, ['lifecycle']);
    
    // Validation debug (can be filtered separately)
    this.logger.debug('Validating input', { input }, ['validation']);
    
    // Rendering debug (can be filtered separately)
    this.logger.debug('Rendering UI', { components }, ['rendering']);
  }
  
  validateField(field: string) {
    this.logger.debug('Field validation', { field }, ['validation']);
    
    if (!this.isValid(field)) {
      this.logger.warn('Invalid field', { field });
      return false;
    }
    
    return true;
  }
}
```

### Settings with File Logging

```typescript
import { createLogger } from '../utils/Logger';

export class MyPlugin extends Plugin {
  private logger = createLogger('main');
  
  async onload() {
    this.logger.info('Plugin loading');
    
    // Enable file logging for troubleshooting
    if (this.settings.enableDebugLogging) {
      this.logger.setFileLogging(true);
    }
    
    try {
      await this.loadSettings();
      this.logger.info('Settings loaded successfully');
    } catch (error) {
      this.logger.error('Failed to load settings', error);
    }
  }
}
```

---

## Development Workflow

### During Development

**Enable debug output for active work:**

```typescript
// In development, show all debug output
logger.setComponentLevel('modal', 'debug');
logger.setComponentLevel('ui', 'debug');

// Or use tag filtering for complex components
logger.setComponentLevel('modal', 'debug', ['validation', 'state']);
```

### Before Committing

**Check for:**
- [ ] No `console.log()` calls (use `logger.debug()` instead)
- [ ] No `console.debug()` calls (use `logger.debug()` instead)
- [ ] No `console.warn()` calls (use `logger.warn()` instead)
- [ ] No `console.error()` calls (use `logger.error()` instead)
- [ ] Appropriate log levels used (debug vs info vs warn vs error)

### In Production

**Production builds automatically:**
- ✅ Remove all `debug()` calls
- ✅ Remove code between `// DEBUG_START` and `// DEBUG_END`
- ✅ Keep `info()`, `warn()`, `error()` calls
- ✅ Zero runtime overhead from debug code

---

## Best Practices

### 1. Use Appropriate Log Levels

```typescript
// ✅ GOOD: Appropriate levels
this.logger.debug('Internal state', { state });      // Development only
this.logger.info('Operation completed');             // Important events
this.logger.warn('Deprecated feature used');         // Warnings
this.logger.error('Operation failed', error);        // Errors

// ❌ BAD: Wrong levels
this.logger.error('Processing data');                // Not an error!
this.logger.debug('Critical failure');               // Won't show in production!
```

### 2. Include Context

```typescript
// ✅ GOOD: Includes useful context
this.logger.error('Failed to save file', { 
  fileName, 
  error: error.message,
  stackTrace: error.stack 
});

// ❌ BAD: No context
this.logger.error('Failed');
```

### 3. Use Tags for Complex Components

```typescript
// ✅ GOOD: Tags help filter output
this.logger.debug('Validating field', { field }, ['validation']);
this.logger.debug('Rendering component', { time }, ['rendering']);
this.logger.debug('State updated', { oldState, newState }, ['state']);

// ❌ BAD: All mixed together, hard to filter
this.logger.debug('Validating field', { field });
this.logger.debug('Rendering component', { time });
this.logger.debug('State updated', { oldState, newState });
```

### 4. Wrap Expensive Debug Code

```typescript
// ✅ GOOD: Expensive computation wrapped
// DEBUG_START
const debugInfo = this.computeExpensiveDebugInfo();
this.logger.debug('Complex state', debugInfo);
// DEBUG_END

// ❌ BAD: Always computed, even in production
const debugInfo = this.computeExpensiveDebugInfo();
this.logger.debug('Complex state', debugInfo);  // Computation still happens!
```

---

## Common Mistakes

### ❌ Mistake 1: Using console.* Directly

```typescript
// ❌ DON'T
console.log('Processing data');
console.debug('State:', state);
console.warn('Warning');
console.error('Error:', error);

// ✅ DO
this.logger.debug('Processing data');
this.logger.debug('State', { state });
this.logger.warn('Warning');
this.logger.error('Error', error);
```

### ❌ Mistake 2: Using logger.error() for Non-Errors

```typescript
// ❌ DON'T
this.logger.error('Processing data');  // Not an error!

// ✅ DO
this.logger.debug('Processing data');  // Correct level
```

### ❌ Mistake 3: Forgetting to Import

```typescript
// ❌ DON'T
private logger = createLogger('modal');  // Won't work!

// ✅ DO
import { createLogger } from '../utils/Logger';
private logger = createLogger('modal');
```

---

## Summary

**Golden Rules:**

1. ✅ **Never use console.* directly** (always use logger)
2. ✅ **Create component-specific loggers** (`createLogger('componentName')`)
3. ✅ **Use appropriate log levels** (debug/info/warn/error)
4. ✅ **Include context in log messages** (pass data objects)
5. ✅ **Use tags for complex components** (filter debug categories)
6. ✅ **Debug code automatically removed in production** (zero overhead)
7. ✅ **Optional manual cleanup** (when feature is stable)

**Benefits:**

- Consistent logging across entire plugin
- Easy to debug specific components
- Zero production performance impact
- Smaller production bundle size
- File logging for troubleshooting
- Structured, readable output
