import { useState, useEffect, use } from "react";
import "./App.css";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState("function sum(){return 1+2}");
  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  });

  async function reviewCode() {
    const response = await axios.post("https://ai-reviewer-backend.vercel.app/", {
      code,
    });

    setReview(response.data);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>
            Review
          </div>
        </div>
        <div className="right">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </ReactMarkdown>
        </div>
      </main>
    </>
  );
}

export default App;
