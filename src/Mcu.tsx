"use client";

import { useMemo } from "react";
import {
  DEFAULT_ADAPTIVE_SHADES,
  DEFAULT_CONTRAST,
  DEFAULT_CONTRAST_ALL_COLORS,
  DEFAULT_CUSTOM_COLORS,
  DEFAULT_PREFIX,
  DEFAULT_SCHEME,
  type McuConfig,
} from "./lib/builder";
import { McuProvider } from "./Mcu.context";

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
  prefix = DEFAULT_PREFIX,
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
      prefix,
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
      prefix,
    ],
  );

  return (
    <McuProvider {...config} styleId={mcuStyleId}>
      {children}
    </McuProvider>
  );
}
