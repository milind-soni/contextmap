<!-- Copyright (c) 2025 ContextMap. Licensed under MIT License. -->
<script lang="ts">
  import type { ContextData } from './ContextManager.js';

  let { currentContext, onClear }: { currentContext: ContextData; onClear: () => void } = $props();
  let expanded = $state(false);
</script>

<div class="border-b border-slate-300 dark:border-slate-600 bg-blue-50 dark:bg-blue-900/20">
  <div class="flex items-center justify-between p-2">
    <button
      onclick={() => expanded = !expanded}
      class="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200"
    >
      📍 Context Active ({currentContext.count} points)
      <span class="transform transition-transform" class:rotate-180={expanded}>▼</span>
    </button>

    <button
      onclick={onClear}
      class="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xs"
      title="Clear context"
    >
      ✕ Clear
    </button>
  </div>

  {#if expanded}
    <div class="p-4 text-xs font-mono max-h-64 overflow-y-auto border-t bg-white dark:bg-slate-900">
      <pre class="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{currentContext.summary}</pre>
    </div>
  {/if}
</div>
