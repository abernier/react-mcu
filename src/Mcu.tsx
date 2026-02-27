"use client";

import { useMemo } from "react";
import {
  DEFAULT_CONTRAST,
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
      prefix,
    ],
  );

  return (
    <McuProvider {...config} styleId={mcuStyleId}>
      {children}
    </McuProvider>
  );
}
