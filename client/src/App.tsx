import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Shortner from './components/Shortner'
import Footer from './components/Footer'
import './App.css'


function App() {


  return (
  <html data-theme="cyberpunk">
    <div className=' min-h-screen'>
      
        <Navbar />
        <Intro />
        <Shortner />
        <Footer />
      
    
    </div>
  </html>
  )
}

export default App
