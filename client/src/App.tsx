import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Shortner from "./components/Shortner";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex justify-center m-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10 mx-5">
          <Shortner />
          <Intro />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
