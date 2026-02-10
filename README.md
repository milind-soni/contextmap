# ContextCanvas

**Visual Context Management for AI** — Turn spatial selections into queryable context for AI agents.

<div align="center">

[Demo](#quick-start) • [Features](#features) • [Vision](#vision) • [Installation](#installation)

</div>

---

## What is ContextCanvas?

ContextCanvas transforms embedding visualizations into **interactive context APIs**. Draw selections on your embedding map, and ContextCanvas extracts the relevant data points as structured context for AI conversations.

**The core insight:** Spatial proximity in embedding space = semantic similarity. By selecting regions visually, you're dynamically curating semantically coherent context.

### How it works

1. **Visualize** — Load your embeddings into an interactive 2D/3D map
2. **Select** — Draw rectangles or lasso regions to select data points
3. **Extract** — ContextCanvas queries the selected points from the database
4. **Chat** — An integrated AI chatbot receives the extracted context automatically
5. **Iterate** — Refine your selection, update the context, ask new questions

```
┌─────────────────────────────────────────────┐
│  Interactive Embedding Map    │  AI Chat    │
│                                │             │
│  [Draw selection]  ──────────> │ [Context]   │
│   • Semantic cluster           │  ↓          │
│   • 50 data points             │ [Query]     │
│   • Spatial region             │  ↓          │
│                                │ [Response]  │
└─────────────────────────────────────────────┘
```

## Vision

**ContextCanvas as a Spatial Knowledge API Generator**

Imagine turning every visual selection into a queryable endpoint:
- **Multi-agent systems** where different agents query different semantic regions
- **Dynamic RAG** where context is spatially organized and visually curated
- **Agent-driven exploration** where AI agents autonomously navigate embedding spaces
- **Reproducible context** through shareable URLs that encode view state

Instead of static vector databases, you get a **visual interface to spatially-organized knowledge** that AI agents can query programmatically.

## Features

### 🎨 Interactive Visualization
- **GPU-accelerated rendering** — Smooth interaction with millions of points (WebGPU/WebGL2)
- **Drawing tools** — Rectangle and lasso selection
- **Real-time filtering** — Cross-filter across multiple views
- **Zoom & pan** — Explore your embedding space at any scale

### 🤖 AI Integration
- **Context extraction** — Automatic data point retrieval from selections
- **Chat interface** — Built-in AI chatbot with dynamic context
- **OpenRouter integration** — Use any LLM (GPT-4, Claude, Llama, etc.)
- **Context awareness** — Chat responses reference the selected data

### ⚡ Performance
- **DuckDB WASM** — In-browser SQL queries on your data
- **Mosaic coordination** — Efficient cross-filtering and data coordination
- **Client-side processing** — All data stays in your browser

### 🛠️ Developer-Friendly
- **CSV/Parquet/JSON support** — Load your data directly
- **Svelte 5** — Modern reactive components
- **Type-safe** — Full TypeScript support
- **Embeddable** — Use as standalone app or embed components

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- An OpenRouter API key (free at [openrouter.ai](https://openrouter.ai))

### Installation

```bash
# Clone the repository
git clone https://github.com/milind-soni/contextcanvas.git
cd contextcanvas

# Install dependencies
npm install

# Set up your OpenRouter API key
echo 'VITE_OPENROUTER_API_KEY=your-key-here' > .env

# Start the development server
cd packages/viewer
npm run dev
```

Open [http://localhost:5173/#/contextcanvas](http://localhost:5173/#/contextcanvas)

### Load Your Data

ContextCanvas expects data with at least these columns:
- `x`, `y` — 2D projection coordinates
- `text` — The text content for each point
- Optional: `category`, `label`, or other metadata

**Example CSV:**
```csv
x,y,text,category
-0.2,0.1,"AI Research: Neural networks",Research
0.1,-0.3,"AI Research: Computer vision",Research
2.1,1.9,"Machine Learning: Classification",Application
```

Upload via the file picker or load from a URL.

## Use Cases

### 📚 Knowledge Base Exploration
Navigate large document collections spatially. See which documents cluster together, select regions to chat about specific topics.

### 🔍 Research Analysis
Visualize academic papers, select clusters by topic, and ask questions about the literature in that area.

### 💬 Conversation Context Management
Visualize chat history or conversation turns, select relevant context for follow-up questions.

### 🎯 RAG System Development
Prototype and tune retrieval strategies by visually exploring what context gets retrieved for different queries.

### 🤝 Multi-Agent Systems (Future)
Different agents query different semantic regions. Coordinator agents select regions and delegate to specialist agents.

## Architecture

### Frontend Stack
- **Svelte 5** — Reactive UI framework with runes
- **Vite** — Fast build tooling and dev server
- **Mosaic** — Data coordination and cross-filtering
- **DuckDB WASM** — In-browser SQL database
- **WebGPU/WebGL2** — Hardware-accelerated rendering

### Data Flow
```
CSV/Parquet ──> DuckDB WASM ──> Mosaic Coordinator
                     │                │
                     │                ├─> Embedding View (WebGPU)
                     │                │
                     └────────────────┴─> Context Extraction (SQL)
                                          │
                                          └─> AI Chat (OpenRouter)
```

### Chat Integration
- **Vite proxy** — Handles OpenRouter API calls server-side (dev mode)
- **Context injection** — Selected points formatted as markdown context
- **Streaming support** — Real-time response streaming (coming soon)

## Project Structure

```
contextcanvas/
├── packages/
│   ├── viewer/                    # Main ContextCanvas application
│   │   ├── src/
│   │   │   ├── ContextCanvasApp.svelte      # Main app component
│   │   │   ├── contextcanvas/               # ContextCanvas-specific code
│   │   │   │   ├── chat/                    # AI chat components
│   │   │   │   └── context/                 # Context extraction logic
│   │   │   └── app/
│   │   │       └── ContextCanvasViewer.svelte  # Entry point
│   │   └── vite.config.js                   # Includes OpenRouter proxy
│   │
│   ├── component/                 # Core embedding visualization components
│   ├── table/                     # Data table component
│   ├── backend/                   # Python backend (optional)
│   ├── density-clustering/        # WASM clustering
│   ├── umap-wasm/                 # WASM UMAP projection
│   └── embedding-atlas/           # Original Embedding Atlas package
│
└── .env                           # Your OpenRouter API key
```

## Development

### Running the App

```bash
cd packages/viewer
npm run dev
```

Navigate to `http://localhost:5173/#/contextcanvas`

### Building for Production

```bash
cd packages/viewer
npm run build
```

### Environment Variables

Create a `.env` file in the project root:

```bash
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

Get your free API key at [openrouter.ai](https://openrouter.ai).

## Roadmap

### ✅ Completed
- Interactive embedding visualization
- Drawing tools (rectangle/lasso selection)
- Context extraction from spatial selections
- AI chat integration with dynamic context
- OpenRouter API integration

### 🚧 In Progress
- Streaming chat responses
- Context history and versioning
- Multiple selection management

### 🔮 Future
- **API endpoint generation** — Create queryable endpoints from visual selections
- **Agent SDK** — Programmatic access for AI agents
- **Multi-agent orchestration** — Coordinate multiple agents across semantic regions
- **Context caching** — Frequently accessed regions cached for performance
- **Collaborative editing** — Share and annotate embedding maps
- **Custom embeddings** — Upload your own embedding models

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Credits

ContextCanvas is built on [**Apple's Embedding Atlas**](https://github.com/apple/embedding-atlas), an excellent open-source tool for embedding visualization.

**Original Embedding Atlas Authors:**
- Donghao Ren
- Fred Hohman
- Halden Lin
- Dominik Moritz

We extend our gratitude to the Apple team for creating such a powerful foundation.

**ContextCanvas Extensions:**
- AI chat integration with context injection
- OpenRouter API integration
- Dynamic context extraction from spatial selections
- Vite proxy for secure API handling

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with 🎨 for smarter context management**

[GitHub](https://github.com/milind-soni/contextcanvas) • [Issues](https://github.com/milind-soni/contextcanvas/issues) • [Discussions](https://github.com/milind-soni/contextcanvas/discussions)

</div>
