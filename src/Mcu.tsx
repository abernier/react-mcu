"use client";

import { useMemo } from "react";
import {
  builder,
  DEFAULT_ADAPTIVE_SHADES,
  DEFAULT_BLEND,
  DEFAULT_CONTRAST,
  DEFAULT_CONTRAST_ALL_COLORS,
  DEFAULT_CUSTOM_COLORS,
  DEFAULT_SCHEME,
  type McuConfig,
  schemeNames,
  STANDARD_TONES,
  tokenNames,
  type TokenName,
} from "./lib/builder";
import { McuProvider, useMcu } from "./Mcu.context";

const mcuStyleId = "mcu-styles";
const DEFAULT_COLOR_MATCH = false;

export function Mcu({
  source,
  scheme = DEFAULT_SCHEME,
  contrast = DEFAULT_CONTRAST,
  primary,
  secondary,
  tertiary,
  neutral,
  neutralVariant,
  error,
  colorMatch = DEFAULT_COLOR_MATCH,
  customColors = DEFAULT_CUSTOM_COLORS,
  contrastAllColors = DEFAULT_CONTRAST_ALL_COLORS,
  adaptiveShades = DEFAULT_ADAPTIVE_SHADES,
  children,
}: McuConfig & { children?: React.ReactNode }) {
  const config = useMemo(
    () => ({
      source,
      scheme,
      contrast,
      primary,
      secondary,
      tertiary,
      neutral,
      neutralVariant,
      error,
      colorMatch,
      customColors,
      // extras features
      contrastAllColors,
      adaptiveShades,
    }),
    [
      contrast,
      customColors,
      scheme,
      source,
      primary,
      secondary,
      tertiary,
      neutral,
      neutralVariant,
      error,
      colorMatch,
      contrastAllColors,
      adaptiveShades,
    ],
  );

  return (
    <McuProvider {...config} styleId={mcuStyleId}>
      {children}
    </McuProvider>
  );
}

// Re-export items from builder for backward compatibility
export { builder, schemeNames, STANDARD_TONES, tokenNames, type TokenName, type McuConfig, DEFAULT_ADAPTIVE_SHADES, DEFAULT_BLEND, DEFAULT_CONTRAST, DEFAULT_CONTRAST_ALL_COLORS, DEFAULT_SCHEME } from "./lib/builder";

