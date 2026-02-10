<!-- Copyright (c) 2025 ContextMap. Licensed under MIT License. -->
<script lang="ts">
  let { onSend, disabled = false }: { onSend: (content: string) => void; disabled?: boolean } = $props();
  let input = $state('');

  function handleSubmit() {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      input = '';
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }
</script>

<div class="border-t border-slate-300 dark:border-slate-600 p-4 bg-white dark:bg-slate-800">
  <div class="flex gap-2">
    <textarea
      bind:value={input}
      onkeydown={handleKeydown}
      {disabled}
      placeholder="Ask about the selected context..."
      class="flex-1 resize-none rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100"
      rows="2"
    />
    <button
      onclick={handleSubmit}
      {disabled}
      class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Send
    </button>
  </div>
</div>
