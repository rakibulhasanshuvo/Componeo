"use client";

import { getSandpackCssText } from "@codesandbox/sandpack-react";
import { useServerInsertedHTML } from "next/navigation";

/**
 * Ensures CSS-in-JS styles from Sandpack are loaded server-side.
 */
export const SandPackCSS = () => {
  useServerInsertedHTML(() => {
    // Sanitize the CSS text to prevent XSS breakout vulnerabilities
    // Replace `</style` with `</\73 tyle` to prevent parsing of the closing style tag.
    // `\73 ` is the CSS hex escape for `s`.
    const cssText = getSandpackCssText().replace(/<\/style/gi, "</\\73 tyle");

    return (
      <style
        id="sandpack"
        dangerouslySetInnerHTML={{ __html: cssText }}
      />
    );
  });
  return null;
};
