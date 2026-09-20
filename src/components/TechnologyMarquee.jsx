import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TechnologyMarquee({ technologies }) {
  const trackRef = useRef(null)
  const stepRef = useRef(null)
  const controlsRef = useRef({ hover: 0, focus: 0 })

  useEffect(() => {
    const track = trackRef.current
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cycleWidth = 0
    let position = 0
    let speed = 0
    let jump = null
    let previousTime = null
    let frameId

    const render = () => {
      if (!cycleWidth) return
      position = ((position % cycleWidth) + cycleWidth) % cycleWidth
      track.style.transform = `translate3d(${-position}px, 0, 0)`
    }

    const measure = () => {
      const [first, second] = track.children
      const nextWidth = second.getBoundingClientRect().left - first.getBoundingClientRect().left
      if (cycleWidth) {
        const ratio = nextWidth / cycleWidth
        position *= ratio
        if (jump) {
          jump.distance *= ratio
          jump.applied *= ratio
        }
      }
      cycleWidth = nextWidth
      render()
    }

    const animate = (time) => {
      const elapsed = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      const { hover, focus } = controlsRef.current
      const direction = hover || focus
      const targetSpeed = (cycleWidth / 24) * (direction ? direction * 5 : 1)
      speed += (targetSpeed - speed) * (1 - Math.exp(-elapsed * 8))
      if (jump) {
        jump.elapsed = Math.min(jump.elapsed + elapsed, 0.5)
        const progress = jump.elapsed / 0.5
        const easedProgress = progress * progress * (3 - 2 * progress)
        const offset = jump.distance * easedProgress
        position += offset - jump.applied
        jump.applied = offset
        if (progress === 1) jump = null
      } else {
        position += speed * elapsed
      }
      render()
      frameId = requestAnimationFrame(animate)
    }

    const updatePlayback = () => {
      cancelAnimationFrame(frameId)
      previousTime = null
      speed = cycleWidth / 24
      if (motionQuery.matches && jump) {
        position += jump.distance - jump.applied
        jump = null
        render()
      }
      if (!motionQuery.matches && !document.hidden) {
        frameId = requestAnimationFrame(animate)
      }
    }

    // Each click adds five cards to the remaining movement, without resetting position.
    stepRef.current = (direction) => {
      const distance = direction * 5 * cycleWidth / technologies.length
      if (motionQuery.matches) {
        position += distance
        render()
        return
      }
      const remaining = jump ? jump.distance - jump.applied : 0
      jump = { distance: remaining + distance, applied: 0, elapsed: 0 }
    }

    const observer = new ResizeObserver(measure)
    observer.observe(track.children[0])
    measure()
    updatePlayback()
    motionQuery.addEventListener('change', updatePlayback)
    document.addEventListener('visibilitychange', updatePlayback)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      motionQuery.removeEventListener('change', updatePlayback)
      document.removeEventListener('visibilitychange', updatePlayback)
      stepRef.current = null
    }
  }, [technologies])

  const arrow = (direction) => {
    const Icon = direction === 1 ? ChevronRight : ChevronLeft
    return (
      <button
        type="button"
        className="technology-arrow"
        aria-label={direction === 1 ? 'Avancer de cinq technologies' : 'Reculer de cinq technologies'}
        aria-controls="technology-track"
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') controlsRef.current.hover = direction
        }}
        onPointerLeave={() => { controlsRef.current.hover = 0 }}
        onPointerCancel={() => { controlsRef.current.hover = 0 }}
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) controlsRef.current.focus = direction
        }}
        onBlur={() => { controlsRef.current.focus = 0 }}
        onClick={() => stepRef.current?.(direction)}
      >
        <Icon size={20} aria-hidden="true" />
      </button>
    )
  }

  return (
    <div className="technology-carousel">
      {arrow(-1)}
      <div className="technology-marquee">
        <div className="technology-track" id="technology-track" ref={trackRef}>
          {[0, 1].map((setIndex) => (
            <div className="technology-set" key={setIndex} aria-hidden={setIndex !== 0 || undefined}>
              {technologies.map((technology) => (
                <div className="technology-item" key={technology.name}>
                  <img src={technology.logo} alt="" />
                  <span>{technology.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {arrow(1)}
    </div>
  )
}
