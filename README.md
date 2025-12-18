# Three.js Starter

A modern Three.js boilerplate inspired by [Bruno Simon's](https://threejs-journey.com/) course structure, with several architectural improvements.

## Key Differences from Bruno's Approach

- **TypeScript** - Full type safety throughout
- **Bun** - Fast package manager and runtime
- **Dependency Injection** - Classes receive dependencies via constructor instead of singleton pattern
- **Type-safe EventEmitter** - Generic event emitter with typed payloads instead of a generic callback system
- **Shader Examples** - Includes GLSL shader integration with `vite-plugin-glsl`
- **Up-to-date Dependencies** - All packages are current (Three.js r182, Vite, TypeScript 5.9)

## Getting Started

```bash
bun install
bun run dev
```

## Debug UI

Add `#debug` to the URL to enable Tweakpane controls.

## Project Structure

```
src/
├── experience/
│   ├── experience.ts    # Main orchestrator
│   ├── camera.ts        # Camera + OrbitControls
│   ├── renderer.ts      # WebGL renderer
│   ├── sources.ts       # Asset definitions
│   └── world/           # Scene objects
├── utils/
│   ├── events.ts        # Type-safe EventEmitter
│   ├── time.ts          # Animation loop (tick events)
│   ├── sizes.ts         # Viewport (resize events)
│   ├── resources.ts     # Asset loader
│   └── debug.ts         # Tweakpane wrapper
└── glsl/                # Shader files (.vert/.frag)
```
