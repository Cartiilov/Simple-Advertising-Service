import React from 'react'
import App from './App.tsx'
import './index.css'
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
