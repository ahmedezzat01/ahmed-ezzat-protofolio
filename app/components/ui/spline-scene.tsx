"use client"

import { Suspense, lazy, Component, ReactNode } from 'react'

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <ErrorBoundary fallback={
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-cyber-red/10 border-2 border-cyber-red/30" />
      </div>
    }>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="animate-spin h-8 w-8 border-2 border-cyber-red border-t-transparent rounded-full" />
          </div>
        }
      >
        <Spline scene={scene} className={className} />
      </Suspense>
    </ErrorBoundary>
  )
}
