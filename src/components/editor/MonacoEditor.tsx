"use client";

import React from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface MonacoEditorProps {
  value: string;
  onChange?: (value: string | undefined) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ 
  value, 
  onChange, 
  language = "typescript", 
  height = "600px",
  readOnly = false
}) => {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Customizing the editor theme to match COMPONEO (Liquid Glass Dark)
    monaco.editor.defineTheme("componeo-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6272a4", fontStyle: "italic" },
        { token: "keyword", foreground: "00f2ff" },
        { token: "identifier", foreground: "ffffff" },
        { token: "typeIdentifier", foreground: "bf00ff" },
        { token: "string", foreground: "f1fa8c" },
        { token: "operator", foreground: "ff79c6" },
      ],
      colors: {
        "editor.background": "#0a0a0b", // Deeper black
        "editor.foreground": "#ffffff",
        "editor.lineHighlightBackground": readOnly ? "#00f2ff05" : "#ffffff08",
        "editorLineNumber.foreground": "#444444",
        "editorIndentGuide.background": "#ffffff05",
        "editor.selectionBackground": "#00f2ff33",
        "editorCursor.foreground": "#00f2ff",
      },
    });
    monaco.editor.setTheme("componeo-dark");

    if (!readOnly) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        editor.getAction("editor.action.formatDocument")?.run();
      });
    }
  };

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-700 ${
      readOnly 
        ? "border-cyan-400/20 shadow-[0_0_50px_rgba(0,210,253,0.05)] bg-[#050505]" 
        : "border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#0a0a0b]"
    }`}>
      <Editor
        height={height}
        defaultLanguage={language}
        defaultValue={value}
        value={value}
        theme="componeo-dark"
        onMount={handleEditorDidMount}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly: readOnly,
          domReadOnly: readOnly,
          automaticLayout: true,
          padding: { top: 20, bottom: 20 },
          cursorBlinking: "phase",
          smoothScrolling: true,
          cursorSmoothCaretAnimation: "on",
          bracketPairColorization: { enabled: true },
          wordWrap: "on",
          renderLineHighlight: "all",
          contextmenu: !readOnly,
        }}
      />
    </div>
  );
};

export default MonacoEditor;
