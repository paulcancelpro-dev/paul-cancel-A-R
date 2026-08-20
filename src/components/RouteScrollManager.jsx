import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function RouteScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 })
      return undefined
    }

    const frame = window.requestAnimationFrame(() => {
      const targetId = decodeURIComponent(hash.slice(1))
      document.getElementById(targetId)?.scrollIntoView()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default RouteScrollManager
