import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ToastProvider>
              <Home />
            </ToastProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}