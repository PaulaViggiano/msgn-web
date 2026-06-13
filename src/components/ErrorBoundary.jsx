import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('[MSGN] Error de render:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-center px-6">
          <h1 className="font-playfair text-3xl font-bold text-off-white mb-4">
            Algo salió mal
          </h1>
          <p className="text-brand-slate mb-8 max-w-md">
            Disculpá las molestias. Podés recargar la página o escribirnos directamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => window.location.reload()}
              className="font-mono text-[0.68rem] tracking-[3px] uppercase bg-gold text-bg px-7 py-4 border border-gold hover:bg-gold2 hover:border-gold2 transition-all duration-300">
              Recargar
            </button>
            <a href="https://wa.me/5492994567290" target="_blank" rel="noreferrer"
              className="font-mono text-[0.68rem] tracking-[3px] uppercase text-cream2 px-7 py-4 border border-[rgba(237,232,223,0.2)] hover:border-gold hover:text-gold transition-all duration-300">
              WhatsApp
            </a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}