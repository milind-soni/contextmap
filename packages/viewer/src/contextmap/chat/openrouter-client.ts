// Copyright (c) 2025 ContextMap. Licensed under MIT License.

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface SendMessageOptions {
  apiKey: string;
  messages: Message[];
  model: string;
}

export async function sendMessage(options: SendMessageOptions): Promise<string> {
  const { apiKey, messages, model } = options;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
      'X-Title': 'ContextMap'
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error?.message || error.error || 'API request failed');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
