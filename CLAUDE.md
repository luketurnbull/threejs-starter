# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` - Start Vite dev server with HMR
- **Build**: `npm run build` - TypeScript check + Vite production build
- **Preview**: `npm run preview` - Preview production build locally

## Debug Mode

Add `#debug` to the URL (e.g., `http://localhost:5173/#debug`) to enable the Tweakpane debug UI.

## Architecture

This is a Three.js starter using TypeScript and Vite with an event-driven class-based architecture.

### Path Aliases

- `@utils/*` → `src/utils/*`
- `@experience/*` → `src/experience/*`
- `@glsl/*` → `src/glsl/*`

### Core Structure

**Experience** (`src/experience/experience.ts`) - Main orchestrator that initializes all systems and manages the render loop via event subscriptions.

**Utils** (`src/utils/`):
- `EventEmitter` - Type-safe pub/sub base class used throughout
- `Time` - Emits `tick` events with `delta` and `elapsed` values each frame
- `Sizes` - Emits `resize` events with viewport dimensions
- `Resources` - Async asset loader that emits `ready` when all sources load
- `Debug` - Tweakpane wrapper, active when URL hash is `#debug`

**World** (`src/experience/world/`) - Scene objects created after resources load:
- `World` - Container that instantiates scene objects on `resources.ready`
- `Environment` - Lighting and environment map setup
- `Floor`, `Fox` - Example scene objects demonstrating textures, GLTF models, and animations

### Resource Loading

Define assets in `src/experience/sources.ts` with `name`, `type` (`texture`, `cubeTexture`, `gltfModel`), and `path`. Access loaded assets via `resources.items[name]` after the `ready` event.

### GLSL Shaders

Place shaders in `src/glsl/` with `.vert`/`.frag` extensions. Import directly in TypeScript via `vite-plugin-glsl`:
```typescript
import vertexShader from "@glsl/plane/vertex.vert";
```

### Adding Scene Objects

1. Create a class in `src/experience/world/`
2. Instantiate in `World` constructor (after `resources.ready` if assets needed)
3. Subscribe to `time.on("tick")` for animations
4. Add `update()` method if called from World's update loop
