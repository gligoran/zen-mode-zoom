# Zen Font Scale

Automatically scales your editor font size when entering Zen Mode in VS Code, making it easier to focus on your code.

## Features

- **Auto-scaling font size** — font size increases when you enter Zen Mode and restores when you exit
- **Configurable scale factor** — choose how much bigger the font gets (1.0x to 3.0x)
- **Crash recovery** — if VS Code closes while in Zen Mode, the original font size is restored on next launch
- **Keyboard shortcut** — toggle Zen Mode with font scaling via `Cmd+K Z` (macOS) / `Ctrl+K Z` (Windows/Linux)

## Usage

Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run:

```
Zen Font Scale: Toggle Zen Mode with Font Scaling
```

Or use the keyboard shortcut: `Cmd+K Z` (macOS) / `Ctrl+K Z` (Windows/Linux).

## Settings

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| `zenFontScale.scaleFactor` | `1.5` | `1.0` – `3.0` | Font size multiplier when entering Zen Mode |

## How It Works

When you toggle Zen Mode through this extension:

1. **Entering Zen Mode** — saves your current `editor.fontSize`, multiplies it by the scale factor, applies the new size, then activates Zen Mode
2. **Exiting Zen Mode** — deactivates Zen Mode, then restores your original font size

The original font size is persisted in VS Code's global state. If VS Code is closed unexpectedly while in Zen Mode, the extension detects this on next launch and automatically restores your font size.

## License

[MIT](LICENSE)
