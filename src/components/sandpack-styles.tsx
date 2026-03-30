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
          __html: (cssText || "").replace(/<\/(style)/gi, "<\\/$1"),
        }}
      />
    );
  });
  return null;
};
