"use client";

import React from "react";
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackPreview, 
  SandpackCodeViewer,
  useSandpack 
} from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

interface LivePreviewRendererProps {
  code: string;
  theme?: "dark" | "light";
  showCode?: boolean;
  className?: string;
}

const CustomPreview = () => {
  const { sandpack } = useSandpack();
  return (
    <SandpackPreview 
      className="h-full w-full" 
      showNavigator={false} 
      showOpenInCodeSandbox={false} 
    />
  );
};

export default function LivePreviewRenderer({ 
  code, 
  theme = "dark", 
  showCode = false,
  className = ""
}: LivePreviewRendererProps) {
  
  // Basic setup for a React/Framer Motion component
  const files = {
    "/App.tsx": code,
    "/public/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Componeo Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-[#0a0a0a]">
    <div id="root"></div>
  </body>
</html>`,
  };

  return (
    <div className={`w-full h-full overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] ${className}`}>
      <SandpackProvider
        template="react-ts"
        theme={atomDark}
        files={files}
        customSetup={{
          dependencies: {
            "framer-motion": "latest",
            "lucide-react": "latest",
            "clsx": "latest",
            "tailwind-merge": "latest"
          }
        }}
        options={{
          recompileMode: "delayed",
          recompileDelay: 500,
        }}
      >
        <SandpackLayout className="h-full border-none !bg-transparent">
          {showCode && (
            <div className="flex-1 border-r border-white/5 bg-[#0d0d0d]">
              <SandpackCodeViewer showLineNumbers />
            </div>
          )}
          <div className="flex-1 h-full">
            <CustomPreview />
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
