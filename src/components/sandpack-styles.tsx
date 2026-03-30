"use client";

import { getSandpackCssText } from "@codesandbox/sandpack-react";
import { useServerInsertedHTML } from "next/navigation";

/**
 * Ensures CSS-in-JS styles from Sandpack are loaded server-side.
 */
export const SandPackCSS = () => {
  useServerInsertedHTML(() => {
    const cssText = getSandpackCssText();

    return (
      <style
        id="sandpack"
        dangerouslySetInnerHTML={{
          // Prevent XSS via style tag breakout by replacing the sequence `</style`
          // with a CSS-escaped version `< \/ style`.
          // This neutralizes HTML parsing without breaking CSS validity.
          // (HTML spec prohibits spaces in the closing tag, so `</style` is sufficient)
          __html: (cssText || "").replace(/<\/(style)/gi, "<\\/$1"),
        }}
      />
    );
  });
  return null;
};
