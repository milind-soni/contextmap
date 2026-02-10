<!-- Copyright (c) 2025 ContextMap. Licensed under MIT License. -->
<script lang="ts">
  import ChatMessage from './ChatMessage.svelte';
  import ChatInput from './ChatInput.svelte';
  import { sendMessage } from './openrouter-client.js';
  import type { ContextData } from '../context/ContextManager.js';

  interface Message {
    role: 'user' | 'assistant' | 'system' | 'error';
    content: string;
    timestamp: number;
  }

  let {
    messages = $bindable([]),
    context,
    onMessagesChange
  }: {
    messages: Message[];
    context: ContextData | null;
    onMessagesChange?: (messages: Message[]) => void;
  } = $props();

  let chatContainer: HTMLDivElement;
  let isLoading = $state(false);
  let errorMessage = $state<string | null>(null);

  async function handleSend(content: string) {
    const userMessage: Message = { role: 'user', content, timestamp: Date.now() };
    messages = [...messages, userMessage];
    onMessagesChange?.(messages);

    isLoading = true;
    errorMessage = null;

    try {
      const systemPrompt = context
        ? `You are a helpful assistant analyzing data. Here is the context from the user's selection:\n\n${context.summary}\n\nAnswer questions about this data.`
        : 'You are a helpful assistant.';

      const response = await sendMessage({
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.filter(m => m.role !== 'error')
        ],
        model: 'openai/gpt-4o-mini'
      });

      messages = [...messages, {
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }];
      onMessagesChange?.(messages);
    } catch (error: any) {
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  }

  $effect(() => {
    if (chatContainer) {
      chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
    }
  });
</script>

<div class="flex flex-col h-full bg-white dark:bg-slate-800">
  <div
    bind:this={chatContainer}
    class="flex-1 overflow-y-auto p-4 space-y-4"
  >
    {#if messages.length === 0}
      <div class="text-slate-400 dark:text-slate-500 text-sm text-center py-8">
        Draw a shape on the map to select context, then ask questions about it.
      </div>
    {/if}

    {#each messages as message}
      <ChatMessage {message} />
    {/each}

    {#if isLoading}
      <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
        <span class="animate-pulse">●</span>
        <span>Thinking...</span>
      </div>
    {/if}

    {#if errorMessage}
      <div class="text-red-500 dark:text-red-400 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
        Error: {errorMessage}
      </div>
    {/if}
  </div>

  <ChatInput onSend={handleSend} disabled={isLoading} />
</div>
