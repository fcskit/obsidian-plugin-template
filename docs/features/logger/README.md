# Logger System Overview

The template includes a sophisticated centralized logging system with component-based filtering and automatic debug elimination.

## Quick Start

### Basic Usage

```typescript
import { createLogger } from './utils/Logger';

class MyComponent {
    private logger = createLogger('myComponent');
    
    someMethod() {
        this.logger.debug('Method called', { data });
        this.logger.info('Operation completed');
        this.logger.warn('Warning message', error);
        this.logger.error('Error occurred', error);
    }
}
```

## Features

### Component-Based Logging

Each component gets its own logger with independent log level:

```typescript
const logger = createLogger('modal');  // Component name
```

**Available components:**
- `main` - Plugin entry point
- `modal` - Modal dialogs
- `ui` - UI components
- `settings` - Settings management
- `api` - API calls
- `events` - Event handling
- `general` - General/uncategorized

### Log Levels

Four log levels in order of severity:

1. **debug** - Detailed diagnostic information
2. **info** - General informational messages
3. **warn** - Warning messages for potential issues
4. **error** - Error messages for failures

**Filtering:**
- Setting level to `warn` shows warn + error (filters debug + info)
- Setting level to `debug` shows everything

### Default Configuration

All components default to `warn` level:

```typescript
const DEFAULT_CONFIG: LoggerConfig = {
    main: 'warn',
    modal: 'warn',
    api: 'warn',
    // ... etc
};
```

**In development:** Explicitly enable debug in `main.ts`:

```typescript
if (typeof BUILD_ENV !== 'undefined' && BUILD_ENV === 'development') {
    logger.setComponentLevel('main', 'debug');
    logger.setComponentLevel('modal', 'debug');
    // ... enable for all components
}
```

### Tag-Based Filtering

For complex components with lots of debug output, use tags:

```typescript
// Enable only specific debug categories
logger.setComponentLevel('npe', 'debug', ['validation', 'state']);

// Use tags in debug calls
logger.debug('Field valid', { field }, ['validation']);  // ✅ Shows
logger.debug('Rendering', { time }, ['rendering']);      // ❌ Hidden
```

**See:** [Tag-Based Filtering Guide](tag-based-filtering.md)

### File Logging

Optional logging to file (`debug-log.txt` in vault root):

```typescript
// Enable file logging (in main.ts)
logger.initFileLogging(this.app);

// Disable on plugin unload
logger.disableFileLogging();
```

**Features:**
- Buffered writes (efficient)
- Automatic flush on plugin unload
- Timestamped entries
- Only active when enabled

## Production Behavior

### Automatic Debug Elimination

In production builds, **all debug code is eliminated**:

```typescript
// Development: Full output
this.logger.debug('Processing', { data });

// Production: This line doesn't execute!
// Zero runtime overhead
```

**How it works:**
1. `BUILD_ENV` constant replaced at build time
2. `isDevelopment()` returns `false` in production
3. Debug method returns early
4. Tree-shaking removes unreachable code

**Result:** 
- Debug calls become no-ops
- No performance impact
- Smaller bundle size

### Preserved Logging

`info`, `warn`, and `error` remain in production:

```typescript
this.logger.info('Plugin loaded');    // ✅ Shows in production
this.logger.warn('Deprecated API');   // ✅ Shows in production
this.logger.error('Failed to load');  // ✅ Shows in production
```

## API Reference

### createLogger(component)

Creates a component-specific logger:

```typescript
const logger = createLogger('componentName');
```

**Returns:** ComponentLogger with methods:
- `debug(message, data?, tags?)`
- `info(message, data?)`
- `warn(message, data?)`
- `error(message, data?)`

### logger.debug(message, data?, tags?)

Log debug message (eliminated in production):

```typescript
this.logger.debug('User clicked button', { 
    buttonId: 'submit',
    timestamp: Date.now() 
}, ['user-interaction']);
```

**Parameters:**
- `message` - String message
- `data` - Optional object with context
- `tags` - Optional array of tags for filtering

### logger.info(message, data?)

Log informational message:

```typescript
this.logger.info('Settings saved', { 
    settingCount: 5 
});
```

### logger.warn(message, data?)

Log warning message:

```typescript
this.logger.warn('Deprecated API used', {
    api: 'oldMethod',
    replacement: 'newMethod'
});
```

### logger.error(message, data?)

Log error message:

```typescript
this.logger.error('Failed to load data', error);
```

## Configuration Methods

### setComponentLevel(component, level, tags?)

Set log level for a component:

```typescript
logger.setComponentLevel('modal', 'debug');
logger.setComponentLevel('npe', 'debug', ['validation']);
```

### setConfig(config)

Set configuration for multiple components:

```typescript
logger.setConfig({
    main: 'debug',
    modal: 'debug',
    ui: 'info'
});
```

### setEnabled(enabled)

Enable/disable all logging:

```typescript
logger.setEnabled(false);  // Silence all logs
```

## Best Practices

### Use Appropriate Levels

```typescript
// ✅ Debug: Detailed diagnostic info
this.logger.debug('Validating field', { field, value });

// ✅ Info: General events
this.logger.info('Modal opened');

// ✅ Warn: Potential issues
this.logger.warn('Slow operation detected', { duration });

// ✅ Error: Failures
this.logger.error('API request failed', error);
```

### Include Context

```typescript
// ❌ Not helpful
this.logger.debug('Processing');

// ✅ Helpful
this.logger.debug('Processing user input', {
    fieldName: 'email',
    valueLength: value.length,
    isValid: true
});
```

### Use Tags for Complex Components

```typescript
// In a large component with multiple concerns
this.logger.debug('Validation passed', { field }, ['validation']);
this.logger.debug('Rendering complete', { time }, ['rendering']);
this.logger.debug('State updated', { state }, ['state']);

// Enable only what you need
logger.setComponentLevel('component', 'debug', ['validation']);
```

### Don't Elevate Debug to Warn

```typescript
// ❌ Wrong: This will show in production!
this.logger.warn('Debug info:', data);

// ✅ Right: Use debug level
this.logger.debug('Debug info:', data);

// ✅ Right: Use tags to filter noise
this.logger.debug('Debug info:', data, ['specific-tag']);
```

## Troubleshooting

### Debug Messages Not Showing

**Check log level:**
```typescript
// In main.ts, ensure debug is enabled
if (BUILD_ENV === 'development') {
    logger.setComponentLevel('yourComponent', 'debug');
}
```

**Check component name matches:**
```typescript
// Must match exactly
createLogger('modal')  // Component name
logger.setComponentLevel('modal', 'debug')  // Same name
```

### Too Much Debug Output

**Use tag filtering:**
```typescript
logger.setComponentLevel('npe', 'debug', ['validation']);
```

**Or raise level temporarily:**
```typescript
logger.setComponentLevel('noisy-component', 'info');
```

### File Logging Not Working

**Enable in main.ts:**
```typescript
logger.initFileLogging(this.app);
```

**Check vault root:**
- Look for `debug-log.txt`
- File created on first log write
- Buffered, may need flush

## Related Documentation

- [Tag-Based Filtering](tag-based-filtering.md) - Advanced filtering guide
- [Debug System](../debug-system/code-elimination.md) - How debug elimination works
- [Code Examples](../../examples/logger-usage.ts) - Practical examples
