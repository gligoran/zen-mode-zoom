import * as vscode from "vscode";

const STATE_KEY = "preZenZoomLevel";

export async function activate(context: vscode.ExtensionContext) {
  // Crash recovery: if we were in Zen Mode when VS Code closed,
  // the zoom level is still elevated but Zen Mode itself doesn't persist.
  // Restore the original zoom level.
  const crashRecoveryZoom = context.globalState.get<number>(STATE_KEY);
  if (crashRecoveryZoom !== undefined) {
    const windowConfig = vscode.workspace.getConfiguration("window");
    await windowConfig.update(
      "zoomLevel",
      crashRecoveryZoom,
      vscode.ConfigurationTarget.Global
    );
    await context.globalState.update(STATE_KEY, undefined);
  }

  const command = vscode.commands.registerCommand(
    "zenModeZoom.toggle",
    async () => {
      const savedZoom = context.globalState.get<number>(STATE_KEY);
      const zoomIncrement = vscode.workspace
        .getConfiguration("zenModeZoom")
        .get<number>("zoomIncrement", 2);
      const windowConfig = vscode.workspace.getConfiguration("window");

      if (savedZoom === undefined) {
        // Entering Zen Mode: save current zoom, increase it, then toggle
        const currentZoom = windowConfig.get<number>("zoomLevel", 0);
        await context.globalState.update(STATE_KEY, currentZoom);
        await windowConfig.update(
          "zoomLevel",
          currentZoom + zoomIncrement,
          vscode.ConfigurationTarget.Global
        );
        await vscode.commands.executeCommand(
          "workbench.action.toggleZenMode"
        );
      } else {
        // Exiting Zen Mode: toggle first, then restore original zoom
        await vscode.commands.executeCommand(
          "workbench.action.toggleZenMode"
        );
        await windowConfig.update(
          "zoomLevel",
          savedZoom,
          vscode.ConfigurationTarget.Global
        );
        await context.globalState.update(STATE_KEY, undefined);
      }
    }
  );

  context.subscriptions.push(command);
}

export function deactivate() {}
