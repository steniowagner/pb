import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Main } from "./pages/main/Main";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="w-full h-screen flex justify-center items-center">
      <Main />
    </div>
  </StrictMode>
);
