# ContextMap

**Visual Context Management Tool** - An interactive map-based interface for visualizing and managing AI context, built on [Apple's Embedding Atlas](https://github.com/apple/embedding-atlas).

> *"Like GIS for your AI context"* - Visualize, annotate, and prioritize your context on an interactive map.

## Vision

ContextMap transforms how you manage context for AI applications. Instead of managing context as linear text or flat lists, ContextMap lets you:

- 🗺️ **Visualize context spatially** - See all your context laid out on an interactive 2D map
- ✏️ **Draw and annotate** - Create shapes, regions, and annotations to organize context
- 🎯 **Control priorities** - Visually manage what context gets emphasized or de-emphasized
- 🔍 **Filter and search** - Real-time filtering across your entire context landscape
- 🎨 **Cluster and organize** - Automatic clustering with custom labeling
- ⚡ **GPU-accelerated** - Smooth interaction with millions of context items

## Use Cases

- **Context window management** - Visualize what's in your context and control what stays/goes
- **Knowledge base exploration** - Navigate large document collections spatially
- **Multi-document analysis** - See relationships between documents in 2D space
- **RAG optimization** - Visualize and tune your retrieval strategy
- **Prompt engineering** - Manage complex prompt components visually

## Architecture

Built on Apple's Embedding Atlas foundation:

**Frontend:**
- Svelte 5 + WebGPU (WebGL 2 fallback)
- Real-time cross-filtering with Mosaic
- GPU-accelerated rendering

**Backend:**
- FastAPI (Python) + DuckDB
- UMAP dimensionality reduction
- Sentence transformers for embeddings

**Extensions (ContextMap-specific):**
- Custom annotation system
- Context priority weighting
- Shape-based context grouping
- State persistence for context configurations

## Quick Start

### Option 1: Python CLI

```bash
pip install -e packages/backend

# Visualize your context data
contextmap <your-context-data.parquet>
```

### Option 2: Jupyter Widget

```python
from embedding_atlas.widget import EmbeddingAtlasWidget

# Show your context map
EmbeddingAtlasWidget(df)
```

### Option 3: Web Components

```bash
npm install
npm run build
```

```js
import { EmbeddingAtlas, EmbeddingView, Table } from "embedding-atlas";

// or with React:
import { EmbeddingAtlas, EmbeddingView, Table } from "embedding-atlas/react";

// or Svelte:
import { EmbeddingAtlas, EmbeddingView, Table } from "embedding-atlas/svelte";
```

## Project Structure

```
contextmap/
├── packages/
│   ├── component/              # Core rendering components
│   ├── table/                  # Table component for context items
│   ├── viewer/                 # Full application UI
│   ├── backend/                # Python backend + CLI
│   ├── density-clustering/     # Rust clustering (WASM)
│   ├── umap-wasm/              # UMAP projection (WASM)
│   ├── embedding-atlas/        # Published npm package
│   └── docs/                   # Documentation
├── scripts/                    # Build scripts
└── README.md                   # This file
```

## Roadmap

### Phase 1: Foundation (Current)
- [x] Port Embedding Atlas codebase
- [ ] Set up development environment
- [ ] Verify all components build

### Phase 2: Context Features
- [ ] Custom annotation overlay system
- [ ] Context priority/weighting visualization
- [ ] Shape-based context grouping
- [ ] Context state persistence

### Phase 3: Advanced Features
- [ ] Multi-context sessions
- [ ] Context diff visualization
- [ ] Export/import context configurations
- [ ] LLM integration for context optimization

### Phase 4: Collaboration
- [ ] Shared context maps
- [ ] Real-time collaboration
- [ ] Context versioning

## Development

Install dependencies:

```bash
npm install
```

Build all packages:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Format code:

```bash
npm run check-format
```

For detailed development instructions, see the [development guide](https://apple.github.io/embedding-atlas/develop.html).

## Credits

ContextMap is built on [Apple's Embedding Atlas](https://github.com/apple/embedding-atlas), an excellent tool for embedding visualization.

Original Embedding Atlas authors:
- Donghao Ren
- Fred Hohman
- Halden Lin
- Dominik Moritz

## License

This code is released under the [MIT license](LICENSE).

---

*Built with 🧠 for better context management*
