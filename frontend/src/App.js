import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Splash from "@/pages/Splash";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Plans from "@/pages/Plans";
import Portfolio from "@/pages/Portfolio";
import AIChat from "@/pages/AIChat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/ai" element={<AIChat />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster richColors position="top-center" />
      </BrowserRouter>
    </div>
  );
}

export default App;
