# TypeScript Best Practices

**Generic coding standards for all TypeScript projects.**

---

## File Size Limits (CRITICAL)

**Maximum file sizes to maintain readability and modularity:**

- **TypeScript source files**: 500 lines maximum
- **UI component files**: 300 lines maximum  
- **Utility files**: 200 lines maximum
- **Modal/Dialog files**: 400 lines maximum
- **Settings files**: 400 lines maximum

**When a file approaches its limit:**

❌ **NEVER add more code to an already large file**

✅ **ALWAYS refactor into smaller, focused modules**

**Signs a file needs splitting:**
1. File has multiple unrelated responsibilities
2. File exceeds line count limits
3. Hard to find specific functions
4. Many private helper methods (extract to utilities)
5. Multiple UI components in one file (separate them)
6. Long scroll distance to navigate
7. Difficult to understand at a glance

---

## Type Safety

**ALWAYS use strong typing, NEVER use `any`:**

```typescript
// ❌ BAD: Using 'any' loses type safety
function processData(data: any) {
    return data.value; // No error if 'value' doesn't exist!
}

// ✅ GOOD: Proper types
interface DataRecord {
    value: string;
    metadata: Record<string, unknown>;
}

function processData(data: DataRecord): string {
    return data.value; // Type-safe!
}
```

**Use TypeScript features:**

```typescript
// ✅ Use interfaces for object shapes
interface NoteMetadata {
    title: string;
    created: Date;
    tags: string[];
    author?: string;  // Optional property
}

// ✅ Use type unions for alternatives
type Status = 'pending' | 'active' | 'completed' | 'failed';

// ✅ Use generics for reusable code
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
    return items.find(item => item.id === id);
}

// ✅ Use type guards
function isError(value: unknown): value is Error {
    return value instanceof Error;
}
```

---

## Error Handling

**ALWAYS handle errors explicitly:**

```typescript
// ❌ BAD: Silent failures
async function loadData() {
    const data = await fetchData(); // Might throw!
    return data;
}

// ✅ GOOD: Explicit error handling
async function loadData(): Promise<DataRecord[]> {
    try {
        const data = await fetchData();
        this.logger.info('Data loaded successfully', { count: data.length });
        return data;
    } catch (error) {
        this.logger.error('Failed to load data', error);
        throw new Error(`Data loading failed: ${error.message}`);
    }
}
```

**Use early returns for validation:**

```typescript
// ❌ BAD: Nested conditions
function processRecord(record: Record) {
    if (record) {
        if (record.isValid) {
            if (record.data) {
                // Process record
            }
        }
    }
}

// ✅ GOOD: Early returns
function processRecord(record: Record) {
    if (!record) {
        this.logger.warn('No record provided');
        return;
    }
    
    if (!record.isValid) {
        this.logger.warn('Invalid record', { id: record.id });
        return;
    }
    
    if (!record.data) {
        this.logger.warn('Record has no data', { id: record.id });
        return;
    }
    
    // Process record - main logic at end, not nested
    this.processData(record.data);
}
```

---

## Async/Await Best Practices

**Use async/await consistently:**

```typescript
// ❌ BAD: Mixing promises and async/await
async function fetchAndProcess() {
    return fetchData().then(data => {
        return processData(data).then(result => {
            return result;
        });
    });
}

// ✅ GOOD: Consistent async/await
async function fetchAndProcess() {
    const data = await fetchData();
    const result = await processData(data);
    return result;
}
```

**Handle promise rejections:**

```typescript
// ✅ GOOD: Proper error handling with Promise.all
async function loadMultipleRecords(ids: string[]) {
    try {
        const records = await Promise.all(
            ids.map(id => this.loadRecord(id))
        );
        return records;
    } catch (error) {
        this.logger.error('Failed to load records', error);
        throw error;
    }
}
```

---

## Modularity and Code Organization (CRITICAL)

**ALWAYS prefer modular design over monolithic files.**

### Principle 1: Single Responsibility

Each file should have ONE clear purpose:

```typescript
// ❌ BAD: Everything in one file
src/ui/UserInterface.ts  // Modals, forms, buttons, validations, API calls...

// ✅ GOOD: Each file has one responsibility
src/ui/modals/CreateRecordModal.ts    // One modal
src/ui/modals/EditRecordModal.ts      // Another modal
src/ui/forms/RecordForm.ts            // Form component
src/ui/components/Button.ts           // Reusable button
src/validation/recordValidator.ts     // Validation logic
src/api/recordApi.ts                  // API calls
```

### Principle 2: Extract Reusable Code

**When you write similar code twice, extract it:**

```typescript
// ❌ BAD: Duplicated logic in multiple modals
class Modal1 {
    validateField() { /* 30 lines of validation */ }
}
class Modal2 {
    validateField() { /* same 30 lines */ }
}

// ✅ GOOD: Extracted to shared utility
// src/utils/validation.ts
export function validateField() { /* 30 lines once */ }

// src/modals/Modal1.ts
import { validateField } from '../utils/validation';
class Modal1 {
    validate() { return validateField(this.data); }
}
```

### Principle 3: Namespace Folders

**Group related files in subdirectories:**

```typescript
// ✅ GOOD: Organized by feature/responsibility
src/
├── modals/
│   ├── CreateNoteModal.ts
│   ├── EditNoteModal.ts
│   └── DeleteConfirmModal.ts
├── forms/
│   ├── NoteForm.ts
│   ├── MetadataForm.ts
│   └── TemplateForm.ts
├── components/
│   ├── Button.ts
│   ├── Dropdown.ts
│   └── SearchBox.ts
└── api/
    ├── notesApi.ts
    ├── metadataApi.ts
    └── templatesApi.ts
```

---

## Naming Conventions

**File Names:**
- Use PascalCase for class files (e.g., `ExampleModal.ts`, `SettingsTab.ts`)
- Use camelCase for utility files (e.g., `validation.ts`, `formatters.ts`)
- Use kebab-case for directories (e.g., `ui/`, `api-client/`, `note-processor/`)

**Variable and Function Names:**
- Use camelCase for variables and functions: `userName`, `calculateTotal()`
- Use PascalCase for classes and types: `UserRecord`, `NoteMetadata`
- Use UPPER_SNAKE_CASE for constants: `MAX_FILE_SIZE`, `DEFAULT_TIMEOUT`
- Use descriptive names: `getUserById()` not `get()`
- Avoid abbreviations unless very common: `id`, `url`, `api` are OK

**Component and Class Names:**
- Suffix modals with `Modal`: `CreateNoteModal`, `SettingsModal`
- Suffix forms with `Form`: `MetadataForm`, `TemplateForm`
- Suffix managers with `Manager`: `TemplateManager`, `CacheManager`
- Suffix handlers with `Handler`: `EventHandler`, `ErrorHandler`
- Suffix utilities with descriptive names: `validation`, `formatting`, `apiHelpers`
