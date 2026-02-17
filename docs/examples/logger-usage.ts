/**
 * Logger Usage Examples
 * 
 * This file demonstrates all features of the logging system.
 * Run with: npx tsx docs/examples/logger-usage.ts
 */

import { logger, createLogger, LogLevel } from '../../src/utils/Logger';

// Example 1: Basic Component Logger
console.log('\n=== Example 1: Basic Component Logger ===\n');

const uiLogger = createLogger('ui');

uiLogger.debug('Debug message');
uiLogger.info('Info message');
uiLogger.warn('Warning message');
uiLogger.error('Error message');

// Example 2: Component-Level Filtering
console.log('\n=== Example 2: Component-Level Filtering ===\n');

// Set different levels for different components
logger.setComponentLevel('main', 'debug');
logger.setComponentLevel('api', 'info');
logger.setComponentLevel('ui', 'warn');

const mainLogger = createLogger('main');
const apiLogger = createLogger('api');

mainLogger.debug('This shows (main is at debug level)');
apiLogger.debug('This is hidden (api is at info level)');
apiLogger.info('This shows (api is at info level)');
uiLogger.warn('This shows (ui is at warn level)');

// Example 3: Tag-Based Filtering
console.log('\n=== Example 3: Tag-Based Filtering ===\n');

// Complex component with lots of debug output
const npeLogger = createLogger('modal');

// Enable debug only for specific tags
logger.setComponentLevel('modal', 'debug', ['validation', 'state']);

// These show (tags match filter)
npeLogger.debug('Field validation failed', { field: 'name' }, ['validation']);
npeLogger.debug('State updated', { newState: 'active' }, ['state']);

// These are hidden (tags don't match filter)
npeLogger.debug('Rendering started', { time: Date.now() }, ['rendering']);
npeLogger.debug('Event handled', { event: 'click' }, ['events']);

// Info/warn/error always show regardless of tags
npeLogger.info('Important info message');
npeLogger.warn('Warning message');
npeLogger.error('Error message');

// Example 4: Dynamic Tag Management
console.log('\n=== Example 4: Dynamic Tag Management ===\n');

// Check active filters
const filters = logger.getTagFilters('modal');
console.log('Active tag filters for modal:', filters);

// Add more tags
logger.setComponentLevel('modal', 'debug', ['validation', 'state', 'rendering']);
console.log('Updated filters:', logger.getTagFilters('modal'));

// Now rendering messages show
npeLogger.debug('Rendering complete', { duration: 123 }, ['rendering']);

// Clear tag filters (show all debug)
logger.clearTagFilters('modal');
console.log('Filters after clear:', logger.getTagFilters('modal'));

// Now all debug shows
npeLogger.debug('This shows (no filters active)');
npeLogger.debug('This also shows', undefined, ['any-tag']);

// Example 5: Multi-Tag Messages
console.log('\n=== Example 5: Multi-Tag Messages ===\n');

logger.setComponentLevel('modal', 'debug', ['validation']);

// Message with multiple tags - shows if ANY tag matches
npeLogger.debug('Validation and rendering', { data: 'test' }, ['validation', 'rendering']);

// Example 6: Standard Tag Categories
console.log('\n=== Example 6: Standard Tag Categories ===\n');

// Define standard tags for your plugin
const DEBUG_TAGS = {
    VALIDATION: 'validation',
    RENDERING: 'rendering',
    STATE: 'state',
    EVENTS: 'events',
    API: 'api',
    TEMPLATE: 'template',
    PERFORMANCE: 'performance',
} as const;

logger.setComponentLevel('modal', 'debug', [DEBUG_TAGS.VALIDATION, DEBUG_TAGS.PERFORMANCE]);

npeLogger.debug('Field validated', { field: 'email' }, [DEBUG_TAGS.VALIDATION]);
npeLogger.debug('Operation took 45ms', { duration: 45 }, [DEBUG_TAGS.PERFORMANCE]);
npeLogger.debug('State changed', { state: 'active' }, [DEBUG_TAGS.STATE]);  // Hidden

// Example 7: Settings Integration Example
console.log('\n=== Example 7: Settings Integration ===\n');

interface DebugSettings {
    componentLevels: {
        [key: string]: {
            level: LogLevel;
            tags?: string[];
        };
    };
}

const debugSettings: DebugSettings = {
    componentLevels: {
        'modal': {
            level: 'debug',
            tags: ['validation', 'state']
        },
        'api': {
            level: 'info',
            tags: undefined  // No tag filtering
        }
    }
};

// Apply settings
Object.entries(debugSettings.componentLevels).forEach(([component, config]) => {
    logger.setComponentLevel(component as any, config.level, config.tags);
});

console.log('Settings applied. Modal filters:', logger.getTagFilters('modal'));

// Example 8: Combining with Manual Cleanup Markers
console.log('\n=== Example 8: Debug Code Organization ===\n');

class ExampleComponent {
    private logger = createLogger('ui');
    
    validateField(field: string) {
        // DEBUG_START
        this.logger.debug('Validating field', { 
            field,
            timestamp: Date.now() 
        }, ['validation']);
        // DEBUG_END
        
        const isValid = field.length > 0;
        
        if (!isValid) {
            // Errors always shown (not wrapped in DEBUG_START/END)
            this.logger.error('Validation failed', { field });
        }
        
        return isValid;
    }
    
    render() {
        // DEBUG_START
        this.logger.debug('Rendering started', undefined, ['rendering']);
        // DEBUG_END
        
        // Rendering logic...
        
        // DEBUG_START
        this.logger.debug('Rendering complete', undefined, ['rendering']);
        // DEBUG_END
    }
}

const component = new ExampleComponent();
component.validateField('test');
component.render();

// Summary
console.log('\n=== Summary ===\n');
console.log('✅ Component-based log levels');
console.log('✅ Tag-based filtering for fine-grained control');
console.log('✅ File logging support (disabled in this example)');
console.log('✅ Debug code elimination in production builds');
console.log('✅ Manual cleanup markers (DEBUG_START/END)');
console.log('\nSee docs/developer/TAG-BASED-FILTERING.md for complete guide.');
