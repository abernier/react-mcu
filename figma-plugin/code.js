// Material Theme Builder — Figma Plugin Code
//
// This file runs in Figma's main thread (sandbox).
// It shows the plugin UI (built from the React source in src/ via Vite)
// and handles messages from the UI to create/update Figma Variables.

figma.showUI(__html__, { width: 860, height: 740, themeColors: true });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "apply-variables") {
    try {
      const { light, dark } = msg.tokens;

      // Resolve or create the "Material Theme" variable collection
      const collections =
        await figma.variables.getLocalVariableCollectionsAsync();
      let collection = collections.find(
        (c) => c.name === "Material Theme",
      );
      if (!collection) {
        collection =
          figma.variables.createVariableCollection("Material Theme");
        collection.renameMode(collection.modes[0].modeId, "Light");
        collection.addMode("Dark");
      }

      const lightModeId = collection.modes[0].modeId;
      const darkModeId = collection.modes[1]
        ? collection.modes[1].modeId
        : collection.addMode("Dark");

      // Get existing variables in this collection
      const existingVars =
        await figma.variables.getLocalVariablesAsync("COLOR");
      const varsByName = new Map(
        existingVars
          .filter((v) => v.variableCollectionId === collection.id)
          .map((v) => [v.name, v]),
      );

      // Helper: convert {r, g, b, a} floats to Figma RGBA
      function toFigmaColor(components, alpha) {
        return {
          r: components[0],
          g: components[1],
          b: components[2],
          a: alpha ?? 1,
        };
      }

      // Walk token tree and create/update variables
      function walkTokens(tokens, prefix, modeId) {
        for (const [key, value] of Object.entries(tokens)) {
          if (value && typeof value === "object" && value.$type === "color") {
            const name = prefix ? prefix + "/" + key : key;
            let variable = varsByName.get(name);
            if (!variable) {
              variable = figma.variables.createVariable(
                name,
                collection,
                "COLOR",
              );
              varsByName.set(name, variable);
            }
            const color = toFigmaColor(
              value.$value.components,
              value.$value.alpha,
            );
            variable.setValueForMode(modeId, color);
          } else if (
            value &&
            typeof value === "object" &&
            !value.$type
          ) {
            const nextPrefix = prefix ? prefix + "/" + key : key;
            walkTokens(value, nextPrefix, modeId);
          }
        }
      }

      if (light) walkTokens(light, "", lightModeId);
      if (dark) walkTokens(dark, "", darkModeId);

      figma.notify("✓ Material Theme variables updated!");
    } catch (err) {
      figma.notify("Error: " + (err.message || err), { error: true });
    }
  }

  if (msg.type === "close") {
    figma.closePlugin();
  }
};
