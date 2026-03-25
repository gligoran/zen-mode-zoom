# Zen Mode Zoom

Automatically zooms in the VS Code UI when entering Zen Mode, making it easier to focus on your code.

## Features

- **Auto-zoom UI** — zoom level increases when you enter Zen Mode and restores when you exit
- **Configurable zoom increment** — choose how much to zoom in (1 to 5 levels)
- **Crash recovery** — if VS Code closes while in Zen Mode, the zoom resets naturally on window close; the extension clears its state on next launch
- **Keyboard shortcut** — toggle Zen Mode with zoom via `Cmd+K Z` (macOS) / `Ctrl+K Z` (Windows/Linux)

## Usage

Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run:

```
Zen Mode Zoom: Toggle Zen Mode with Zoom
```

Or use the keyboard shortcut: `Cmd+K Z` (macOS) / `Ctrl+K Z` (Windows/Linux).

## Settings

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `zenModeZoom.zoomIncrement` | `2` | `1` – `5` | Number of zoom-in steps applied when entering Zen Mode |

## How It Works

When you toggle Zen Mode through this extension:

1. **Entering Zen Mode** — executes `workbench.action.zoomIn` the configured number of times, then activates Zen Mode
2. **Exiting Zen Mode** — deactivates Zen Mode, then executes `workbench.action.zoomOut` the same number of times to restore the original zoom level

Per-window zoom commands are used, so each window's zoom level is independent. If VS Code closes unexpectedly while in Zen Mode, the zoom resets naturally when the window closes; the extension clears its internal flag on next launch.

## License

[MIT](LICENSE)
