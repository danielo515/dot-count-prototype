import React from "react";
import ReactDOM from "react-dom";
import BrushProvider from "./hooks/Provider";

import App from "./App";

function startApp() {
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <React.StrictMode>
      <BrushProvider>
        <App />
      </BrushProvider>{" "}
    </React.StrictMode>,
    rootElement
  );
}

if (!window.cordova) {
  startApp();
} else {
  document.addEventListener("deviceready", startApp, false);
}
