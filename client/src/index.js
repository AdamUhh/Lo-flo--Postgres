import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CardProvider } from "./contexts/cardContext";
import { FlashCardProvider } from "./contexts/flashcardContext";
import { SubjectProvider } from "./contexts/subjectContext";
import { UrlProvider } from "./contexts/urlContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UrlProvider>
      <CardProvider>
        <SubjectProvider>
          <FlashCardProvider>
            <App />
          </FlashCardProvider>
        </SubjectProvider>
      </CardProvider>
    </UrlProvider>
  </React.StrictMode>
);
