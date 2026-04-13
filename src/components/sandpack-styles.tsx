"use client";

import { getSandpackCssText } from "@codesandbox/sandpack-react";
import { useServerInsertedHTML } from "next/navigation";

/**
 * Sanitizes CSS text to prevent XSS breakout vulnerabilities.
 *
 * We primarily target the closing </style> tag.
 * HTML parsers treat everything inside <style> as text until they see the string "</style".
 * Even if it's inside a CSS comment or a string, it will still break out.
 *
 * We use the CSS hex escape \73 for the letter 's' to neutralize it.
 * Browsers will render it as 's' in CSS but the HTML parser won't see it as a closing tag.
 *
 * We also use a more aggressive regex to catch variants like </style >.
 */
export const sanitizeCSS = (css: string): string => {
  return css.replace(/<\/style/gi, "</\\73 tyle");
};

/**
 * Ensures CSS-in-JS styles from Sandpack are loaded server-side.
 */
export const SandPackCSS = () => {
  useServerInsertedHTML(() => {
    const cssText = sanitizeCSS(getSandpackCssText());

    return (
      <style
        id="sandpack"
        dangerouslySetInnerHTML={{ __html: cssText }}
      />
    );
  });
  return null;
};
