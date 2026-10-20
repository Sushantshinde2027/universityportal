import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Admissions from "./pages/Admissions";
import Notices from "./pages/Notices";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />

      {/* Floating Assistant Widget */}
      <AIAssistant />
    </BrowserRouter>
  );
}

export default App;
