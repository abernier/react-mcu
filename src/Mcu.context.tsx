"use client";

import { hexFromArgb } from "@material/material-color-utilities";
import React, {
  useCallback,
  useInsertionEffect,
  useMemo,
  useState,
} from "react";
import { createRequiredContext } from "./lib/createRequiredContext";
import {
  generateCss,
  type McuConfig,
  type TokenName,
} from "./Mcu";

// Internal type - more permissive version of McuConfig for internal use
type McuConfigInternal = {
  source?: string;
  scheme?: Parameters<typeof generateCss>[0]["scheme"];
  contrast?: number;
  primary?: string;
  secondary?: string;
  tertiary?: string;
  neutral?: string;
  neutralVariant?: string;
  error?: string;
  colorMatch?: boolean;
  customColors?: Parameters<typeof generateCss>[0]["customColors"];
};

type Api = {
  initials: McuConfigInternal;
  setMcuConfig: (config: McuConfigInternal) => void;
  getMcuColor: (colorName: TokenName, theme?: string) => string;
};

const [useMcu, Provider, McuContext] = createRequiredContext<Api>();

export const McuProvider = ({
  source: initialSource,
  scheme: initialScheme,
  contrast: initialContrast,
  primary: initialPrimary,
  secondary: initialSecondary,
  tertiary: initialTertiary,
  neutral: initialNeutral,
  neutralVariant: initialNeutralVariant,
  error: initialError,
  colorMatch: initialColorMatch,
  customColors: initialCustomColors,
  styleId,
  children,
}: McuConfigInternal & {
  styleId: string;
  children?: React.ReactNode;
}) => {
  const [initials] = useState<McuConfigInternal>(() => ({
    source: initialSource,
    scheme: initialScheme,
    contrast: initialContrast,
    primary: initialPrimary,
    secondary: initialSecondary,
    tertiary: initialTertiary,
    neutral: initialNeutral,
    neutralVariant: initialNeutralVariant,
    error: initialError,
    colorMatch: initialColorMatch,
    customColors: initialCustomColors,
  }));
  // console.log("McuProvider initials", initials);
  const [mcuConfig, setMcuConfig] = useState(initials);

  const { css, mergedColorsLight, mergedColorsDark } = useMemo(
    () => generateCss(mcuConfig),
    [mcuConfig],
  );

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
      return hexFromArgb(
        (theme === "light" ? mergedColorsLight : mergedColorsDark)[colorName],
      );
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
      }) satisfies Api,
    [getMcuColor, initials],
  );

  return <Provider value={value}>{children}</Provider>;
};

export { McuContext, useMcu };
