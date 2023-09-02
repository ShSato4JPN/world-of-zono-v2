import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import hljs from "highlight.js";
import "highlight.js/styles/lioshi.css";
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

const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      if (domNode.name === "code") {
        const quote = domNode.attribs?.quote;
        // コードハイライト用
        const node = domNode.childNodes[0] as Node;
        // コードハイライト用にインデントを調整
        const indentSize = 5;
        const code = node.data.replace(/ {2}/g, " ".repeat(indentSize));
        const highlightedCode = hljs.highlightAuto(code).value;
        return (
          <div className="code-block">
            <div className="quote">{quote && <span>{quote}</span>}</div>
            <pre>
              <code className="hljs">{parse(highlightedCode)}</code>
            </pre>
          </div>
        );
      }
    }
  },
};

export default function ArticleViewer({ stringHTML }: ArticleViewerProps) {
  return parse(stringHTML, options);
}
