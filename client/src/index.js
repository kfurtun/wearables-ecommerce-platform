import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ProjectProvider } from "../src/components/ProjectContext";

ReactDOM.render(
  <React.StrictMode>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
