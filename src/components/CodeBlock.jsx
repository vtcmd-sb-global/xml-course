import { useEffect, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import xml from "react-syntax-highlighter/dist/cjs/languages/prism/xml-doc";
import markup from "react-syntax-highlighter/dist/cjs/languages/prism/markup";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";

// Register languages used in this course
SyntaxHighlighter.registerLanguage("xml", xml);
SyntaxHighlighter.registerLanguage("markup", markup);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("javascript", javascript);

const themes = {
  dark: {
    label: "Dark",
    bg: "#1E1E1E",
    text: "#D4D4D4",
    border: "#3A3A3A",
    keyword: "#569CD6",
    string: "#CE9178",
    className: "#4EC9B0",
    function: "#DCDCAA",
    identifier: "#9CDCFE",
    comment: "#6A9955",
    number: "#B5CEA8",
  },
  light: {
    label: "Light",
    bg: "#FFFFFF",
    text: "#000000",
    border: "#D8D8D8",
    keyword: "#0000FF",
    string: "#A31515",
    className: "#267F99",
    function: "#795E26",
    identifier: "#001080",
    comment: "#008000",
    number: "#098658",
  },
  blue: {
    label: "Blue",
    bg: "#FFFFFF",
    text: "#000000",
    border: "#B8C7E5",
    keyword: "#0000FF",
    string: "#A31515",
    className: "#267F99",
    function: "#795E26",
    identifier: "#001080",
    comment: "#008000",
    number: "#098658",
  },
};

function makeSyntaxStyle(theme) {
  const t = themes[theme];

  return {
    'pre[class*="language-"]': {
      background: t.bg,
      color: t.text,
      margin: 0,
      padding: "18px 20px",
      fontSize: "14px",
      lineHeight: 1.7,
      overflowX: "auto",
      fontFamily: '"Cascadia Code", Consolas, monospace',
    },
    'code[class*="language-"]': {
      background: "transparent",
      color: t.text,
      fontFamily: '"Cascadia Code", Consolas, monospace',
    },
    comment: { color: t.comment },
    keyword: { color: t.keyword },
    string: { color: t.string },
    "class-name": { color: t.className },
    function: { color: t.function },
    "attr-name": { color: t.identifier },
    "attr-value": { color: t.string },
    tag: { color: t.keyword },
    boolean: { color: t.keyword },
    number: { color: t.number || t.className },
    operator: { color: t.text },
    punctuation: { color: t.text },
    variable: { color: t.identifier },
    builtin: { color: t.className },
  };
}

export default function CodeBlock({
  code,
  language = "xml",
  initialTheme = "blue",
}) {
  const [theme, setTheme] = useState(initialTheme);
  const [loaded, setLoaded] = useState(false);

  // Restore the reader's theme preference.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("guide-code-theme");
      if (saved && themes[saved]) setTheme(saved);
    } catch {
      // Continue with the default theme.
    }
    setLoaded(true);
  }, []);

  // Save the preference for other guide pages.
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem("guide-code-theme", theme);
    } catch {
      // The component still works if storage is unavailable.
    }
  }, [theme, loaded]);

  const selected = themes[theme];

  return (
    <section
      className={`guide-code guide-code--${theme}`}
      style={{
        borderColor: selected.border,
        borderRadius: 9,
        border: `1px solid ${selected.border}`,
        overflow: "hidden",
        margin: "16px 0 28px",
      }}
    >
      <div
        className="guide-code__toolbar"
        style={{
          display: "flex",
          gap: 6,
          padding: 8,
          background: theme === "blue" ? "#D0D8F0" : selected.bg,
          borderBottom: `1px solid ${selected.border}`,
        }}
      >
        {Object.entries(themes).map(([key, item]) => (
          <button
            key={key}
            type="button"
            aria-pressed={theme === key}
            onClick={() => setTheme(key)}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: 0,
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: theme === key ? 600 : 400,
              color:
                theme === "dark"
                  ? "#D4D4D4"
                  : "#333333",
              background:
                theme === key
                  ? theme === "dark"
                    ? "#3A3A3A"
                    : "#FFFFFF"
                  : "transparent",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <SyntaxHighlighter
        language={language}
        style={makeSyntaxStyle(theme)}
        showLineNumbers={false}
        wrapLongLines={false}
      >
        {code.trimEnd()}
      </SyntaxHighlighter>
    </section>
  );
}
