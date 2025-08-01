// import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import type { editor } from "monaco-editor";
import { CodeEditorState } from "@/types";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }
  const savedLanguage = localStorage.getItem("language") || "javascript";
  const savedTheme = localStorage.getItem("theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("fontSize");
  return {
    language: savedLanguage,
    fontSize: savedFontSize ? parseInt(savedFontSize, 10) : 16,
    theme: savedTheme,
  };
};

export const useCoderEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();
  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null as editor.IStandaloneCodeEditor | null, // ✅ Proper type
    executionResult: null,
    getCode: () => get().editor?.getValue() || "",
    setEditor: (editorInstance: editor.IStandaloneCodeEditor) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) {
        editorInstance.setValue(savedCode);
      }
      set({ editor: editorInstance });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      // Save current language code before switching
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },

    runCode: async () => {},
  };
});
