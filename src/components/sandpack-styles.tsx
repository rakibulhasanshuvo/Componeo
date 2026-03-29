"use client";

import { getSandpackCssText } from "@codesandbox/sandpack-react";
import { useServerInsertedHTML } from "next/navigation";

/**
 * Ensures CSS-in-JS styles from Sandpack are loaded server-side.
 */
export const SandPackCSS = () => {
  useServerInsertedHTML(() => {
    return (
      <style 
        dangerouslySetInnerHTML={{ __html: getSandpackCssText() }} 
        id="sandpack" 
      />
    );
  });
  return null;
};
