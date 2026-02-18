import {
  hexFromArgb,
  type TonalPalette,
} from "@material/material-color-utilities";
import React, {
  useCallback,
  useInsertionEffect,
  useMemo,
  useState,
} from "react";
import { builder, type McuConfig, type TokenName } from "./lib/builder";
import { createRequiredContext } from "./lib/createRequiredContext";

type Api = {
  initials: McuConfig;
  setMcuConfig: (config: McuConfig) => void;
  getMcuColor: (colorName: TokenName, theme?: string) => string;
  allPalettes: Record<string, TonalPalette>;
};

const [useMcu, Provider, McuContext] = createRequiredContext<Api>();

export const McuProvider = ({
  styleId,
  children,
  ...configProps
}: McuConfig & {
  styleId: string;
  children?: React.ReactNode;
}) => {
  const [initials] = useState<McuConfig>(() => configProps);
  // console.log("McuProvider initials", initials);

  const [mcuConfig, setMcuConfig] = useState(initials);

  // Update mcuConfig when configProps change
  // Use a stable key to detect when config values have changed
  const configKey = JSON.stringify(configProps);
  React.useEffect(() => {
    setMcuConfig(configProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey]);

  const { css, mergedColorsLight, mergedColorsDark, allPalettes } =
    useMemo(() => {
      const { toCss, ...rest } = builder(mcuConfig.source, mcuConfig);
      return { css: toCss(), ...rest };
    }, [mcuConfig]);

  //
  // <style>
  //

  useInsertionEffect(() => {
    let tag = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement("style");
      tag.id = styleId;
      document.head.appendChild(tag);
    }
    tag.textContent = css;
  }, [css, styleId]);

  //
  // getMcuColor
  //

  const getMcuColor = useCallback(
    (colorName: TokenName, theme: string | undefined) => {
      // console.log("getMcuColor", colorName, theme);
      const mergedColors =
        theme === "light" ? mergedColorsLight : mergedColorsDark;
      const colorValue = mergedColors[colorName];

      if (colorValue === undefined) {
        throw new Error(`Unknown MCU token '${colorName}'`);
      }

      return hexFromArgb(colorValue);
    },
    [mergedColorsDark, mergedColorsLight],
  );

  //
  // api
  //

  const value = useMemo(
    () =>
      ({
        initials,
        setMcuConfig,
        getMcuColor,
        allPalettes,
      }) satisfies Api,
    [getMcuColor, initials, allPalettes],
  );

  return <Provider value={value}>{children}</Provider>;
};

export { McuContext, useMcu };
