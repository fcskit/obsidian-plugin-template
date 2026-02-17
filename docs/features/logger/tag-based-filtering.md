# Tag-Based Debug Filtering

## Overview

The logger now supports **tag-based filtering** for fine-grained control over debug output within complex components.

## The Problem

In complex components like the Nested Properties Editor (NPE), enabling debug output for the entire component generates overwhelming amounts of log messages:

```typescript
// Before tag filtering:
logger.setComponentLevel('npe', 'debug');

// Output: HUNDREDS of debug messages
// [NPE] Rendering started
// [NPE] Field created: name
// [NPE] Field created: description
// [NPE] Field created: date
// [NPE] Validation running...
// [NPE] State updated
// [NPE] Re-rendering...
// ... (100+ more lines)
```

This forced developers to:
1. Keep component at 'warn' level
2. Manually elevate important debug to 'warn' level
3. Miss important debug information

## The Solution

Tag-based filtering lets you enable debug output for **specific aspects** of a component:

```typescript
// Enable debug only for validation and state updates
logger.setComponentLevel('npe', 'debug', ['validation', 'state']);

// Now only tagged messages show:
logger.debug('npe', 'Field validation failed', ['validation'], { field });  // ✅ Shows
logger.debug('npe', 'State updated', ['state'], { newState });  // ✅ Shows
logger.debug('npe', 'Rendering started', ['rendering']);  // ❌ Hidden
```

## Usage

### Basic Debug (No Tags)

```typescript
import { createLogger } from '../utils/Logger';

const logger = createLogger('ui');

// Simple debug (no tags)
logger.debug('Processing started');
logger.debug('Data received', { data });
```

### Tagged Debug

```typescript
import { createLogger } from '../utils/Logger';

const logger = createLogger('ui');

// Debug with tags (last argument is string array)
logger.debug('Field validation failed', { field: 'name' }, ['validation']);
logger.debug('Rendering complete', { duration: 123 }, ['rendering']);
logger.debug('State changed', { old, new }, ['state-updates']);
```

### Enabling Tag Filters

```typescript
import { logger } from '../utils/Logger';

// Show ALL debug messages for component
logger.setComponentLevel('ui', 'debug');

// Show ONLY 'validation' and 'rendering' debug messages
logger.setComponentLevel('ui', 'debug', ['validation', 'rendering']);

// Clear tag filters (show all debug again)
logger.clearTagFilters('ui');

// Check active filters
const filters = logger.getTagFilters('ui');
console.log(filters);  // ['validation', 'rendering']
```

## Common Tag Categories

### For UI Components

- `validation` - Field validation, form validation
- `rendering` - Component rendering, DOM updates
- `state` - State changes, state management
- `events` - Event handling, user interactions
- `lifecycle` - Component lifecycle (mount, unmount, update)

### For Data Processing

- `input` - Input data processing
- `output` - Output data generation
- `transform` - Data transformation
- `parse` - Parsing operations
- `serialize` - Serialization operations

### For API/Network

- `request` - API requests
- `response` - API responses
- `error-handling` - Error handling
- `retry` - Retry logic
- `cache` - Caching operations

### For Templates

- `load` - Template loading
- `parse` - Template parsing
- `merge` - Subclass merging
- `validate` - Template validation
- `apply` - Template application

## Real-World Example: Nested Properties Editor

```typescript
import { createLogger } from '../utils/Logger';

export class NestedPropertiesEditor {
    private logger = createLogger('npe');
    
    validateField(field: Field) {
        // DEBUG_START
        this.logger.debug('Validating field', { 
            fieldName: field.name,
            fieldType: field.type 
        }, ['validation']);
        // DEBUG_END
        
        // Validation logic...
        
        // DEBUG_START
        this.logger.debug('Validation complete', {
            valid: isValid,
            errors: validationErrors
        }, ['validation']);
        // DEBUG_END
    }
    
    updateState(newState: State) {
        // DEBUG_START
        this.logger.debug('State update triggered', {
            oldState: this.state,
            newState
        }, ['state']);
        // DEBUG_END
        
        this.state = newState;
        this.render();
    }
    
    render() {
        // DEBUG_START
        this.logger.debug('Rendering started', {
            fieldCount: this.fields.length,
            timestamp: Date.now()
        }, ['rendering']);
        // DEBUG_END
        
        // Rendering logic...
        
        // DEBUG_START
        this.logger.debug('Rendering complete', {
            duration: Date.now() - startTime
        }, ['rendering']);
        // DEBUG_END
    }
}
```

### Using the NPE with Tag Filters

```typescript
// In plugin settings or during debugging:

// Problem: Too much output
logger.setComponentLevel('npe', 'debug');
// Output: 200+ messages on each interaction

// Solution: Filter to specific tags
logger.setComponentLevel('npe', 'debug', ['validation']);
// Output: Only validation messages (10-20 messages)

// Or focus on state changes
logger.setComponentLevel('npe', 'debug', ['state']);
// Output: Only state update messages

// Or combine multiple tags
logger.setComponentLevel('npe', 'debug', ['validation', 'state']);
// Output: Validation + state messages
```

## How It Works

### Tag Matching

When tag filters are active for a component:

1. **No tags on message** → Message is hidden
2. **Tags on message** → Message shown if ANY tag matches filter

```typescript
logger.setComponentLevel('ui', 'debug', ['validation', 'rendering']);

// Message has matching tag → Show
logger.debug('Field valid', data, ['validation']);  // ✅ Shows

// Message has matching tag → Show
logger.debug('Render done', data, ['rendering']);  // ✅ Shows

// Message has no tags → Hide
logger.debug('Processing', data);  // ❌ Hidden

// Message has non-matching tag → Hide
logger.debug('Event fired', data, ['events']);  // ❌ Hidden

// Message has multiple tags, one matches → Show
logger.debug('Field rendered', data, ['validation', 'rendering']);  // ✅ Shows
```

### Tag Filtering Only for Debug Level

Tag filters **only apply to debug level**. Info, warn, and error messages always show (if component level allows):

```typescript
logger.setComponentLevel('ui', 'debug', ['validation']);

logger.debug('Debug msg', data, ['rendering']);  // ❌ Hidden (wrong tag)
logger.info('Info msg', data);  // ✅ Shows (info not filtered)
logger.warn('Warning msg', data);  // ✅ Shows (warn not filtered)
logger.error('Error msg', data);  // ✅ Shows (error not filtered)
```

## Best Practices

### 1. Use Consistent Tag Names

Define standard tags for your plugin:

```typescript
// Create a tags constant
export const DEBUG_TAGS = {
    VALIDATION: 'validation',
    RENDERING: 'rendering',
    STATE: 'state',
    EVENTS: 'events',
    API: 'api',
    TEMPLATE: 'template',
} as const;

// Use consistently
logger.debug('Field valid', data, [DEBUG_TAGS.VALIDATION]);
```

### 2. Tag Granularity

Choose appropriate granularity:

```typescript
// ✅ GOOD - Clear, specific tags
['validation']
['validation', 'field-level']
['rendering', 'performance']

// ❌ TOO GRANULAR - Defeats the purpose
['validation-field-name-required']
['rendering-modal-header-title']

// ❌ TOO BROAD - Not helpful
['debug']
['processing']
```

### 3. Document Your Tags

Add a comment at the top of complex files:

```typescript
/**
 * Nested Properties Editor
 * 
 * Debug tags:
 * - 'validation': Field and form validation
 * - 'rendering': Component rendering and DOM updates
 * - 'state': State changes and state management
 * - 'events': User interaction events
 * - 'lifecycle': Component lifecycle methods
 */
export class NestedPropertiesEditor {
    // ...
}
```

### 4. Combine with DEBUG_START/END

Tag filters work great with manual cleanup markers:

```typescript
// DEBUG_START
this.logger.debug('Complex validation', {
    field: field.name,
    rules: validationRules,
    result: validationResult
}, ['validation']);
// DEBUG_END
```

Both features work together:
- Tag filtering: Fine-tune output during development
- Manual cleanup: Remove debug code when stable

### 5. Settings Integration

Consider adding tag filter controls to plugin settings:

```typescript
interface PluginSettings {
    debugComponentLevels: {
        [key: string]: {
            level: LogLevel;
            tags?: string[];
        }
    };
}

// In settings UI:
new Setting(containerEl)
    .setName('NPE Debug Tags')
    .setDesc('Show only these debug tags (comma-separated)')
    .addText(text => text
        .setPlaceholder('validation,state,rendering')
        .setValue(settings.npeDebugTags?.join(',') || '')
        .onChange(async (value) => {
            const tags = value.split(',')
                .map(t => t.trim())
                .filter(t => t.length > 0);
            
            if (tags.length > 0) {
                logger.setComponentLevel('npe', 'debug', tags);
            }
        }));
```

## API Reference

### Methods

```typescript
// Set component level with optional tag filters
logger.setComponentLevel(
    component: ComponentName,
    level: LogLevel,
    tags?: string[]
): void

// Clear tag filters for component
logger.clearTagFilters(component: ComponentName): void

// Clear all tag filters
logger.clearAllTagFilters(): void

// Get active tag filters
logger.getTagFilters(component: ComponentName): string[] | undefined

// Debug with tags
logger.debug(
    component: ComponentName,
    message: string,
    tags?: string[],
    ...args: unknown[]
): void

// Or using component logger
const logger = createLogger('npe');
logger.debug(message, ...args, tags);  // Tags as last argument
```

### Type Definitions

```typescript
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type ComponentName = 
    | 'main'
    | 'modal'
    | 'api'
    | 'settings'
    | 'ui'
    | 'events'
    | 'general';

export interface TagFilterConfig {
    component: ComponentName;
    level: LogLevel;
    tags: string[];
}
```

## Benefits

### ✅ Focused Debugging
- See only relevant debug output
- Reduce noise from complex components
- Find issues faster

### ✅ Granular Control
- Filter by feature/aspect within component
- Enable multiple related tags
- Adjust filters on-the-fly

### ✅ No Code Changes
- No need to elevate debug to warn
- Keep debug semantics correct
- Easy to enable/disable

### ✅ Better Development Experience
- Less overwhelming output
- Easier to follow execution flow
- Find bugs more efficiently

## Migration Guide

### For Existing Code

No changes needed! Existing debug calls work as before:

```typescript
// Old code (still works)
logger.debug('component', 'Message', data);

// New code (with tags)
logger.debug('component', 'Message', ['tag'], data);
```

### For Complex Components

Gradually add tags to debug calls you want to filter:

```typescript
// Phase 1: Add tags to new debug calls
logger.debug('New feature debug', data, ['new-feature']);

// Phase 2: Add tags to frequently-needed debug
logger.debug('Validation debug', data, ['validation']);

// Phase 3: Add tags to everything else
logger.debug('Rendering debug', data, ['rendering']);
```

### For Plugin Settings

Add UI controls to let users enable specific debug tags:

```typescript
// Allow users to enable debug categories
new Setting(containerEl)
    .setName('Debug Categories')
    .setDesc('Enable debug output for specific areas')
    .addDropdown(dropdown => dropdown
        .addOptions({
            'none': 'No debug output',
            'validation': 'Validation only',
            'rendering': 'Rendering only',
            'state': 'State updates only',
            'all': 'All debug output'
        })
        .onChange(value => {
            if (value === 'none') {
                logger.setComponentLevel('npe', 'warn');
            } else if (value === 'all') {
                logger.setComponentLevel('npe', 'debug');
            } else {
                logger.setComponentLevel('npe', 'debug', [value]);
            }
        }));
```

## Summary

Tag-based filtering provides **granular control** over debug output without changing log levels or elevating debug messages to warnings.

**Perfect for:**
- Complex components with lots of debug output
- Features with distinct aspects (validation, rendering, state)
- Troubleshooting specific issues
- Maintaining clean debug semantics

**Key Features:**
- Optional tags on debug calls
- Component-level tag filtering
- Show only messages with matching tags
- Works with all existing features (file logging, component loggers, debug elimination)
- Zero overhead in production (debug code removed entirely)

This makes debugging complex plugins much more manageable! 🎉
