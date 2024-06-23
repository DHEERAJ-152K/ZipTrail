import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Shortner from "./components/Shortner";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className=" flex flex-col min-h-screen">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative mt-10 px-4">
        <Shortner />
        <Intro />
      </div>
      

      <Footer />
    </div>
  );
}

export default App;
