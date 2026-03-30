"use client";

import { getSandpackCssText } from "@codesandbox/sandpack-react";
import { useServerInsertedHTML } from "next/navigation";

/**
 * Ensures CSS-in-JS styles from Sandpack are loaded server-side.
 */
export const SandPackCSS = () => {
  useServerInsertedHTML(() => {
    let cssText = getSandpackCssText();
    if (typeof cssText === "string") {
      // Prevent XSS via style tag breakout by replacing the sequence `</style`
      // with a CSS-escaped version `\3C /style` (where \3C is the CSS escape for `<`).
      // This neutralizes HTML parsing without breaking CSS validity.
      // (HTML spec prohibits spaces in the closing tag, so `</style` is sufficient)
      cssText = cssText.replace(/<\/(style)/gi, "\\3C /$1");
    }

    return (
      <style
        dangerouslySetInnerHTML={{ __html: cssText || "" }}
        id="sandpack"
      />
    );
  });
  return null;
};
