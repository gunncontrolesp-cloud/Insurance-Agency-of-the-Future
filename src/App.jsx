import './index.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}

export default App
