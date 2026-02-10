<!-- Copyright (c) 2025 ContextMap. Licensed under MIT License. -->
<script lang="ts">
  import { EmbeddingViewMosaic } from "@embedding-atlas/component/svelte";
  import { Selection } from "@uwdata/mosaic-core";
  import type { Coordinator } from "@uwdata/mosaic-core";
  import ChatInterface from "./contextmap/chat/ChatInterface.svelte";
  import ContextDisplay from "./contextmap/context/ContextDisplay.svelte";
  import { ContextManager, type ContextData } from "./contextmap/context/ContextManager.js";

  interface Message {
    role: 'user' | 'assistant' | 'system' | 'error';
    content: string;
    timestamp: number;
  }

  let {
    coordinator,
    data,
    width = 0,
    height = 0
  }: {
    coordinator: Coordinator;
    data: {
      table: string;
      id: string;
      projection: { x: string; y: string };
      text?: string | null;
    };
    width?: number;
    height?: number;
  } = $props();

  const crossFilter = Selection.crossfilter();
  let currentContext = $state<ContextData | null>(null);
  let chatMessages = $state<Message[]>([]);

  // Check if projection data is available
  const hasProjection = data?.projection?.x && data?.projection?.y;

  const contextManager = hasProjection ? new ContextManager(
    coordinator,
    data.table,
    { x: data.projection.x, y: data.projection.y, id: data.id, text: data.text ?? undefined }
  ) : null;

  async function handleRangeSelection(selection: any) {
    if (selection && contextManager) {
      try {
        currentContext = await contextManager.extractFromSelection(selection);
      } catch (error: any) {
        console.error('Error extracting context:', error);
      }
    }
  }

  function handleMessagesChange(messages: Message[]) {
    chatMessages = messages;
  }

  // Calculate dimensions
  let containerWidth = $state(0);
  let containerHeight = $state(0);

  $effect(() => {
    containerWidth = width;
    containerHeight = height;
  });
</script>

<div
  class="w-full h-full flex flex-row bg-slate-100 dark:bg-slate-900"
  bind:clientWidth={containerWidth}
  bind:clientHeight={containerHeight}
>
  {#if hasProjection}
    <!-- Left: Embedding View (65%) -->
    <div class="flex-[65] flex flex-col border-r border-slate-300 dark:border-slate-600">
      <EmbeddingViewMosaic
        {coordinator}
        table={data.table}
        x={data.projection.x}
        y={data.projection.y}
        text={data.text}
        identifier={data.id}
        rangeSelection={crossFilter}
        onRangeSelection={handleRangeSelection}
        width={Math.floor(containerWidth * 0.65)}
        height={containerHeight}
        config={{ colorScheme: 'light' }}
      />
    </div>

    <!-- Right: Chat + Context (35%) -->
    <div class="flex-[35] flex flex-col">
      {#if currentContext}
        <ContextDisplay {currentContext} onClear={() => currentContext = null} />
      {/if}

      <ChatInterface
        messages={chatMessages}
        context={currentContext}
        onMessagesChange={handleMessagesChange}
      />
    </div>
  {:else}
    <!-- Loading or error state -->
    <div class="w-full h-full flex items-center justify-center">
      <div class="text-slate-500 dark:text-slate-400 text-center">
        <div class="text-lg mb-2">Loading projection data...</div>
        <div class="text-sm">Make sure your data has x and y columns configured</div>
      </div>
    </div>
  {/if}
</div>
