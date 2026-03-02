import * as vscode from "vscode";

const STATE_KEY = "originalFontSize";

export function activate(context: vscode.ExtensionContext) {
  // Crash recovery: if we have a saved font size, VS Code was closed while in Zen Mode.
  // Restore the original font size.
  const savedFontSize = context.globalState.get<number>(STATE_KEY);
  if (savedFontSize !== undefined) {
    const config = vscode.workspace.getConfiguration("editor");
    config.update("fontSize", savedFontSize, vscode.ConfigurationTarget.Global);
    context.globalState.update(STATE_KEY, undefined);
  }

  const command = vscode.commands.registerCommand(
    "zenFontScale.toggle",
    async () => {
      const original = context.globalState.get<number>(STATE_KEY);
      const editorConfig = vscode.workspace.getConfiguration("editor");

      if (original === undefined) {
        // Entering Zen Mode: save current font size, scale up, then toggle
        const currentSize = editorConfig.get<number>("fontSize", 14);
        await context.globalState.update(STATE_KEY, currentSize);

        const scaleFactor = vscode.workspace
          .getConfiguration("zenFontScale")
          .get<number>("scaleFactor", 1.5);
        const newSize = Math.round(currentSize * scaleFactor);
        await editorConfig.update(
          "fontSize",
          newSize,
          vscode.ConfigurationTarget.Global
        );

        await vscode.commands.executeCommand(
          "workbench.action.toggleZenMode"
        );
      } else {
        // Exiting Zen Mode: toggle first, then restore font size
        await vscode.commands.executeCommand(
          "workbench.action.toggleZenMode"
        );
        await editorConfig.update(
          "fontSize",
          original,
          vscode.ConfigurationTarget.Global
        );
        await context.globalState.update(STATE_KEY, undefined);
      }
    }
  );

  context.subscriptions.push(command);
}

export function deactivate() {}
