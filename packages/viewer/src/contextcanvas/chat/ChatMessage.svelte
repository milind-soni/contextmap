<!-- Copyright (c) 2025 ContextMap. Licensed under MIT License. -->
<script lang="ts">
  interface Message {
    role: 'user' | 'assistant' | 'system' | 'error';
    content: string;
    timestamp: number;
  }

  let { message }: { message: Message } = $props();
</script>

<div class="flex flex-col gap-1" class:items-end={message.role === 'user'}>
  <div
    class="max-w-[85%] rounded-lg px-3 py-2 text-sm break-words"
    class:bg-blue-500={message.role === 'user'}
    class:text-white={message.role === 'user'}
    class:bg-slate-100={message.role === 'assistant'}
    class:dark:bg-slate-700={message.role === 'assistant'}
    class:dark:text-slate-100={message.role === 'assistant'}
    class:bg-red-100={message.role === 'error'}
    class:dark:bg-red-900={message.role === 'error'}
    class:text-red-700={message.role === 'error'}
    class:dark:text-red-200={message.role === 'error'}
  >
    {message.content}
  </div>
  <div class="text-xs text-slate-400 dark:text-slate-500">
    {new Date(message.timestamp).toLocaleTimeString()}
  </div>
</div>
