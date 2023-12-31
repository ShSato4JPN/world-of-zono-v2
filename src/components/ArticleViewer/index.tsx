import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import bash from "highlight.js/lib/languages/bash";
import "./stackoverflow-dark.css";
import "./style.css";

type ArticleViewerProps = {
  stringHTML: string;
};

/**
 * html-react-parser のドキュメントを読んでも実装方法が分からないため
 * 強引に型データを定義して値を抽出する
 */
type Node = {
  data: string;
};

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("bash", bash);

const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      if (domNode.name === "code") {
        const quote = domNode.attribs?.quote;
        const language = domNode.attribs?.language;
        // コードハイライト用
        const node = domNode.childNodes[0] as Node;
        // コードハイライト用にインデントを調整
        const indentSize = 2;
        const code = node.data.replace(/ {2}/g, " ".repeat(indentSize));
        const highlightedCode = hljs.highlight(language, code).value;

        return (
          <>
            <div className="quote">{quote && <span>{quote}</span>}</div>
            <pre>
              <code className={`hljs ${language}`}>
                {parse(highlightedCode)}
              </code>
            </pre>
          </>
        );
      }
    }
  },
};

export default function ArticleViewer({ stringHTML }: ArticleViewerProps) {
  return parse(stringHTML, options);
}
