
import type { Directive } from 'vue'
import { fromEvent, Subscription, throttleTime, map, switchMap, takeUntil } from 'rxjs'

interface DraggableOptions {
  boundary?: boolean | HTMLElement
}

interface DraggableEl extends HTMLElement {
  _dragSub?: Subscription
  _dragOptions?: DraggableOptions
}

function toNumber(x: number) {
  return Number(x.toFixed(2))
}

const draggable: Directive<DraggableEl, DraggableOptions> = {
  mounted(el, binding) {
    const options = {
      boundary: true,
      ...binding.value
    }
    el._dragOptions = options

    el.style.position = 'absolute'
    el.style.cursor = 'move'
    el.style.touchAction = 'none'

    const mousedown$ = fromEvent<MouseEvent>(el, 'mousedown')
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove')
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup')

    el._dragSub = mousedown$.pipe(
      switchMap(startEvent => {
        startEvent.preventDefault()
        const rect = el.getBoundingClientRect()
        const offsetX = startEvent.clientX - rect.left
        const offsetY = startEvent.clientY - rect.top

        return mousemove$.pipe(
          throttleTime(16),
          map(moveEvent => {
            let x = moveEvent.clientX - offsetX
            let y = moveEvent.clientY - offsetY

            if (options.boundary) {
              const boundaryEl = options.boundary === true ? 
                (el.offsetParent || document.documentElement) : 
                options.boundary
              
              const boundaryRect = boundaryEl.getBoundingClientRect()
              const elWidth = rect.width
              const elHeight = rect.height

              // Correct boundary calculation logic
              const maxX = boundaryRect.width - elWidth
              const maxY = boundaryRect.height - elHeight
              
              x = toNumber(Math.max(0, Math.min(x, maxX)))
              y = toNumber(Math.max(0, Math.min(y, maxY)))
            }

            return { x, y }
          }),
          takeUntil(mouseup$)
        )
      })
    ).subscribe(pos => {
      el.style.left = `${pos.x}px`
      el.style.top = `${pos.y}px`
    })
  },

  beforeUnmount(el) {
    el._dragSub?.unsubscribe()
  }
}

export default draggable
