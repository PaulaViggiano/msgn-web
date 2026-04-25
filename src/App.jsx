import { useEffect } from 'react'
import Nav        from './components/Nav'
import Hero       from './components/Hero'
import MarqueeBar from './components/MarqueeBar'
import Connector  from './components/Connector'
import Stats      from './components/Stats'
import Portfolio  from './components/Portfolio'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative">
      <Nav />
      <Hero />
      <MarqueeBar />
      <div className="divider" />
      <Connector />
      <Stats />
      <div className="divider" />
      <Portfolio />
      <div className="divider" />
      <Contact />
      <Footer />
    </div>
  )
}