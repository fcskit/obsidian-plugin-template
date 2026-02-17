# Debug Code Management - Quick Guide

This guide explains how to use the two-tier debug code elimination system.

## 🎯 Quick Decision: Which Approach?

### Use Automatic Elimination (Default) When:
- ✅ Feature is in active development
- ✅ You might need debug info later
- ✅ Not sure if feature is stable yet
- ✅ Other developers need debug output
- ✅ Still investigating edge cases

**What it does:** Removes debug code from production builds only (source code unchanged)

### Use Manual Cleanup When:
- ✅ Feature stable for 3+ months
- ✅ No bugs reported
- ✅ Debug output no longer helpful
- ✅ Want cleaner, more readable code
- ✅ Before major version release

**What it does:** Permanently removes debug code from source files

## 🚀 Quick Start - Automatic Elimination

This happens **automatically** - you don't need to do anything!

### Step 1: Write Debug Code

```typescript
import { createLogger } from '../utils/Logger';

export class DataProcessor {
    private logger = createLogger('processor');
    
    processData(data: ComplexData) {
        // Debug freely during development!
        this.logger.debug('Processing started', {
            dataSize: data.items.length,
            timestamp: Date.now()
        });
        
        const result = this.transform(data);
        
        this.logger.debug('Processing complete', {
            resultSize: result.length,
            duration: Date.now() - start
        });
        
        return result;
    }
}
```

### Step 2: Build for Production

```bash
npm run build
```

**Result:** All `logger.debug()` calls are **completely removed** from the production bundle!

```typescript
// In production bundle (main.js):
// - Debug calls don't exist
// - Debug arguments not evaluated
// - Zero overhead
```

### Step 3: Test in Obsidian

1. Load plugin in production mode
2. Open DevTools console (Ctrl+Shift+I)
3. Use plugin features
4. **You should see NO debug messages!** ✅

Only errors and warnings appear (as per Obsidian guidelines).

## 🧹 Advanced - Manual Cleanup

Use this **after** a feature is stable to permanently remove debug scaffolding.

### Step 1: Mark Debug Code for Removal

Wrap debug code with special comments:

```typescript
export class RecordSync {
    async syncRecord(record: Record): Promise<void> {
        // DEBUG_START
        this.logger.debug('Starting sync', {
            recordId: record.id,
            metadata: record.metadata
        });
        // DEBUG_END
        
        try {
            const result = await this.api.upload(record);
            
            // DEBUG_START
            this.logger.debug('Upload complete', {
                resultId: result.id
            });
            // DEBUG_END
            
            return result;
        } catch (error) {
            // This stays! (not wrapped in DEBUG_START/END)
            this.logger.error('Sync failed', error);
            throw error;
        }
    }
}
```

**Important:**
- Only wrap debug code you plan to **permanently remove**
- Don't wrap errors, warnings, or important info
- Use for development scaffolding only

### Step 2: Preview Changes

```bash
# See what would be removed (safe, no changes)
npm run clean:debug:dry
```

Output shows:
- Which files have debug blocks
- Line numbers of each block
- How many lines would be removed
- Total statistics

Example:
```
Debug Code Cleanup

Processing 15 files...

  → Removed debug block at lines 27-32
  → Removed debug block at lines 41-43
  ✓ src/api/RecordSync.ts: Would remove 2 debug blocks (8 lines)
  ○ src/settings/Settings.ts (no debug blocks)

Summary:
  Files processed:  15
  Files modified:   3
  Debug blocks:     7
  Lines removed:    34
```

### Step 3: Review Carefully

**Check that you're only removing:**
- ✅ Development debug output
- ✅ Temporary trace logging
- ✅ Debugging from resolved issues
- ✅ Scaffolding no longer needed

**Make sure you're NOT removing:**
- ❌ Error logging
- ❌ Warnings
- ❌ Important info messages
- ❌ Debug you might need later

### Step 4: Run Cleanup

**Option A: Clean specific files**
```bash
node scripts/clean-debug-code.mjs src/api/RecordSync.ts src/ui/SyncModal.ts
```

**Option B: Clean all files**
```bash
npm run clean:debug -- --all
```

### Step 5: Verify & Test

```bash
# Run tests to ensure nothing broke
npm test

# Build and test in Obsidian
npm run build

# Check git diff to review changes
git diff src/
```

### Step 6: Commit

```bash
git add .
git commit -m "Clean debug code from stable RecordSync feature

Feature has been stable for 4 months with no issues reported.
Removed development debug scaffolding to improve code readability."
```

## 📝 Marking Debug Code - Best Practices

### ✅ Good Examples

**Multi-line debug blocks:**
```typescript
// DEBUG_START
this.logger.debug('Complex state', {
    queueSize: this.queue.length,
    processing: this.currentItem,
    cache: Array.from(this.cache.entries())
});
// DEBUG_END
```

**Single-line debug calls:**
```typescript
// DEBUG_START
this.logger.debug('Checkpoint reached');
// DEBUG_END
```

**Debug-only code blocks:**
```typescript
// DEBUG_START
if (isDevelopment()) {
    this.validateInternalState();
    this.dumpCacheContents();
}
// DEBUG_END
```

**Temporary debugging:**
```typescript
// DEBUG_START
console.log('TEMP: Investigating bug #123');
console.log('Data:', JSON.stringify(data, null, 2));
// DEBUG_END
```

### ❌ Bad Examples

**Don't wrap errors:**
```typescript
// ❌ WRONG - Errors should always be logged
// DEBUG_START
this.logger.error('Failed to sync', error);
// DEBUG_END
```

**Don't wrap warnings:**
```typescript
// ❌ WRONG - Warnings are important
// DEBUG_START
this.logger.warn('Deprecated API usage');
// DEBUG_END
```

**Don't wrap info:**
```typescript
// ❌ WRONG - Info is user-facing
// DEBUG_START
this.logger.info('Sync completed successfully');
// DEBUG_END
```

**Don't wrap production logic:**
```typescript
// ❌ WRONG - This is actual logic!
// DEBUG_START
if (needsRetry) {
    this.retryOperation();
}
// DEBUG_END
```

**Don't wrap debug you'll need:**
```typescript
// ❌ WRONG - Might need this for future issues
// DEBUG_START
this.logger.debug('API request', { url, method, headers });
// DEBUG_END
```

## 🔄 Recommended Workflow

### Phase 1: Active Development
```typescript
// Add debug freely (no markers needed yet)
this.logger.debug('New feature - testing flow', { data });
this.logger.debug('Checkpoint 1');
this.logger.debug('Checkpoint 2');
```

**Status:**
- Debug code in source ✅
- Debug code removed from production builds ✅
- Available for troubleshooting ✅

### Phase 2: Testing & Stabilization
```typescript
// Add markers around debug you'll eventually remove
// DEBUG_START
this.logger.debug('New feature - testing flow', { data });
// DEBUG_END

// DEBUG_START
this.logger.debug('Checkpoint 1');
this.logger.debug('Checkpoint 2');
// DEBUG_END
```

**Status:**
- Feature working well
- Debug output less useful
- Marked for eventual cleanup

### Phase 3: Stable Production
```bash
# After 3+ months with no issues
npm run clean:debug:dry  # Preview
npm run clean:debug -- --all  # Clean
npm test  # Verify
git commit -m "Clean debug from stable feature"
```

**Status:**
- Debug code removed from source ✅
- Code cleaner and more readable ✅
- Still removed from production builds ✅

## 🛠 Script Commands Reference

### Preview Changes (Safe)
```bash
# Basic preview
npm run clean:debug:dry

# Verbose preview (shows line numbers)
node scripts/clean-debug-code.mjs --dry-run --verbose --all
```

### Clean Specific Files
```bash
node scripts/clean-debug-code.mjs src/ui/Modal.ts
node scripts/clean-debug-code.mjs src/ui/Modal.ts src/api/Client.ts
```

### Clean All Files
```bash
npm run clean:debug -- --all
node scripts/clean-debug-code.mjs --all
```

### Get Help
```bash
node scripts/clean-debug-code.mjs --help
```

## 💡 Pro Tips

### 1. Use Dry-Run First
Always preview changes before actually removing code:
```bash
npm run clean:debug:dry
```

### 2. Clean in Stages
Don't clean everything at once. Start with one feature:
```bash
node scripts/clean-debug-code.mjs src/features/stable-feature/
npm test
# If OK, continue with more files
```

### 3. Keep Some Debug
Not all debug needs cleanup. Keep debug that:
- Helps troubleshoot reported issues
- Documents API calls and responses
- Tracks important state changes

### 4. Use Version Control
Always commit before cleaning:
```bash
git commit -m "Before debug cleanup"
npm run clean:debug -- --all
git diff  # Review changes
```

### 5. Test Thoroughly
After cleanup:
```bash
npm test  # Unit tests
npm run build  # Production build
# Test in Obsidian manually
```

## ❓ FAQ

**Q: Does automatic elimination work even if I don't use markers?**

A: Yes! `logger.debug()` calls are **always** removed from production builds, whether or not you use DEBUG_START/END markers.

**Q: When should I use manual cleanup?**

A: Only when features are stable (3+ months, no issues) and you want cleaner source code. It's optional!

**Q: Will cleanup break my code?**

A: No, if used correctly. The script only removes code between DEBUG_START/END markers. Always preview first with `--dry-run`.

**Q: Can I undo a cleanup?**

A: Yes, use git to revert:
```bash
git checkout -- src/path/to/file.ts
```

**Q: What if I have unmatched DEBUG_START/END?**

A: The script warns you and skips those blocks. Fix the markers and run again.

**Q: Should I commit DEBUG_START/END markers?**

A: Yes! They document which debug code might be removed later. Other developers can see your intent.

**Q: How do I know what's safe to remove?**

A: Ask yourself:
- Has the feature been stable for months? ✅
- Have I not needed this debug output recently? ✅
- Is this just development scaffolding? ✅
- Would I be OK never seeing this debug again? ✅

If all yes, it's safe to remove.

## 📚 More Information

- Complete technical details: `docs/developer/DEBUG-CODE-ELIMINATION.md`
- Quick summary: `DEBUG-ELIMINATION-SUMMARY.md`
- Script source code: `scripts/clean-debug-code.mjs`

## 🎉 Summary

**Automatic elimination (default):**
- Happens automatically on production builds
- No markers needed
- Debug code stays in source for future use
- Zero impact on users

**Manual cleanup (optional):**
- Use DEBUG_START/END markers
- Run cleanup script when stable
- Improves source code readability
- Safe and reversible with git

**Best practice:**
- Debug freely during development
- Let automatic elimination protect users
- Clean up manually when features are mature
- Best of both worlds! 🚀
