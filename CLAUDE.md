# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run startDev   # Start dev server at http://localhost:8080
npm run build      # Production build to ./build/
```

No test framework is configured (`npm test` is a placeholder).

## Architecture

Potematch is a **Phaser 3 card-matching game** about Japanese potato varieties, deployed to GitHub Pages.

### Global `mt` Object

All subsystems share a single global `mt` object created in `src/potatoMatch.js`:

```
mt.consts        — game constants and potato data
mt.model         — game state (scores, settings, UI positions)
mt.emitter       — Phaser EventEmitter (event bus for scene navigation)
mt.controller    — event listener that triggers scene transitions
mt.game          — Phaser.Game instance
mt.mediaManager  — BGM/SFX management
mt.cardGroup     — card sprites during gameplay
```

### Scene Flow

Scenes run in order: `SceneTitle → SceneMain → SceneResult`, with `SceneCredit` and `ScenePotato` accessible from any scene via nav buttons.

Navigation is event-driven: scenes fire events on `mt.emitter` (e.g. `START_GAME`, `GO_TITLE`, `GO_CREDIT`, `GO_POTATO`), and `controller.js` handles them by stopping BGM and switching scenes.

### Key Files

| File | Purpose |
|------|---------|
| `src/potatoMatch.js` | Entry point; initializes Phaser and all `mt` subsystems |
| `src/constants.js` | Potato variety data (19 varieties), event name constants, audio volumes |
| `src/model.js` | Score state, level tracking, sound on/off, button position registry |
| `src/controller.js` | Event → scene transition mapping |
| `src/util/UIBlock.js` | Base class for all UI components; handles hierarchical positioning and alpha |
| `src/util/mediaManager.js` | Wraps Phaser audio; respects mute state and volume levels |

### Potato Data

`constants.js` defines 19 potato varieties (`potato00`–`potato18`):
- **lv1** (6 varieties): used as playable cards in SceneMain
- **lv2** (7 varieties): special/bonus potatoes
- Remaining 6: color varieties for gallery

Each variety has a sprite sheet (`potato_*_sprite*.png`, 150×150 frames), a photo, and a link to the Japanese Potato Research Institute.

### Asset Paths

Assets are copied to `build/` by webpack's `CopyWebpackPlugin`. During dev, they're served from the project root. Image paths in code use `images/` prefix (e.g. `images/potatos/potato_01.png`).

### Webpack

- Entry: `src/potatoMatch.js` → output: `build/`
- Phaser globals `CANVAS_RENDERER` and `WEBGL_RENDERER` are set to `true` via DefinePlugin
- Vendor bundle split: Phaser goes into a separate `vendors` chunk
- Production: Terser minification, no source maps, `CleanWebpackPlugin` clears `build/` before each build
