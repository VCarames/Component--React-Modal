import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Modal from "./Modal.jsx";
import "./Modal.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Modal />
  </StrictMode>
);
