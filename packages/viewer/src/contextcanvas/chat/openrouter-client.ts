// Copyright (c) 2025 ContextMap. Licensed under MIT License.

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface SendMessageOptions {
  messages: Message[];
  model: string;
}

export async function sendMessage(options: SendMessageOptions): Promise<string> {
  const { messages, model } = options;

  console.log('Sending to OpenRouter via proxy:', {
    model,
    messageCount: messages.length
  });

  // Use local Vite proxy endpoint which adds the API key server-side
  const response = await fetch('/api/openrouter/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages
    })
  });

  console.log('OpenRouter response:', response.status, response.statusText);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenRouter API error:', response.status, errorText);
    try {
      const error = JSON.parse(errorText);
      throw new Error(error.error?.message || error.message || `API Error ${response.status}: ${errorText}`);
    } catch (e) {
      throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
    }
  }

  const data = await response.json();
  console.log('OpenRouter success:', data);
  return data.choices[0]?.message?.content || 'No response from API';
}
