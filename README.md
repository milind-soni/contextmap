# ContextCanvas

**Visual Context Management for AI** — Turn spatial selections into queryable context for AI agents.

---

## What is ContextCanvas?

Draw selections on your embedding map. ContextCanvas extracts the data points as structured context for AI conversations.

**The core insight:** Spatial proximity in embedding space = semantic similarity. Select regions visually to dynamically curate semantically coherent context.

### How it works

```
┌─────────────────────────────────────────────┐
│  Embedding Map (65%)      │  AI Chat (35%)  │
│                            │                 │
│  [Draw selection] ───────> │ [Context + AI]  │
│   50 semantic points       │  Ask questions  │
│   in selected region       │  Get answers    │
└─────────────────────────────────────────────┘
```

1. **Visualize** — Load your embeddings into an interactive 2D map
2. **Select** — Draw rectangles or lasso regions
3. **Extract** — ContextCanvas queries the selected points
4. **Chat** — AI receives the context automatically

## Vision

**Spatial Knowledge API Generator**

Turn visual selections into queryable endpoints:
- **Multi-agent systems** — Different agents query different semantic regions
- **Dynamic RAG** — Spatially organized, visually curated context
- **Agent exploration** — AI agents navigate embedding spaces autonomously
- **Reproducible context** — Shareable URLs encode view state

## Quick Start

```bash
# Clone and install
git clone https://github.com/milind-soni/contextcanvas.git
cd contextcanvas
npm install

# Set up OpenRouter API key
echo 'VITE_OPENROUTER_API_KEY=your-key-here' > .env

# Start dev server
cd packages/viewer
npm run dev
```

Open [http://localhost:5173/#/contextcanvas](http://localhost:5173/#/contextcanvas)

### Data Format

Your data needs: `x`, `y` (coordinates), `text` (content)

```csv
x,y,text,category
-0.2,0.1,"AI Research: Neural networks",Research
2.1,1.9,"Machine Learning: Classification",Application
```

## Features

- 🎨 **GPU-accelerated** — WebGPU/WebGL2 rendering
- ✏️ **Drawing tools** — Rectangle and lasso selection
- 🤖 **AI Chat** — Integrated with OpenRouter (any LLM)
- ⚡ **In-browser** — DuckDB WASM, all data local
- 📊 **Any format** — CSV, Parquet, JSON

## Use Cases

- 📚 **Knowledge base exploration** — Navigate docs spatially
- 🔍 **Research analysis** — Visualize papers by topic
- 🎯 **RAG prototyping** — Tune retrieval visually
- 🤝 **Multi-agent systems** — Coordinate agents across semantic regions

## Tech Stack

- **Svelte 5** + **Vite** — Fast, reactive UI
- **DuckDB WASM** — In-browser SQL
- **Mosaic** — Data coordination
- **WebGPU/WebGL2** — Hardware acceleration
- **OpenRouter** — Any LLM (GPT-4, Claude, Llama, etc.)

## Roadmap

**✅ Done:** Embedding viz • Drawing tools • Context extraction • AI chat

**🚧 Next:** Streaming responses • Context history • API generation

**🔮 Future:** Agent SDK • Multi-agent coordination • Collaborative editing

## License

MIT License

---

<div align="center">

**Built with 🎨 for smarter context management**

[GitHub](https://github.com/milind-soni/contextcanvas) • [Issues](https://github.com/milind-soni/contextcanvas/issues)

</div>
