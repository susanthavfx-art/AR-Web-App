import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { LoaderCircle } from "lucide-react";
import App from "./App";
import { initialiseLibrary } from "./lib/assets";
import { Logo } from "./components/UI";
import "./styles.css";
function Bootstrap() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initialiseLibrary().finally(() => setReady(true));
  }, []);
  if (!ready)
    return (
      <main className="library-boot">
        <Logo full />
        <LoaderCircle size={24} className="spin" />
        <p>Opening your creative toolbox…</p>
      </main>
    );
  return <App />;
}
createRoot(document.getElementById("root")).render(<Bootstrap />);
