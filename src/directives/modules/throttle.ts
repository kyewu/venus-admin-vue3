
import type { Directive, DirectiveBinding } from "vue"

interface Els extends HTMLElement {
  disabled: boolean
  __handleClick__: () => void
}

const throttle: Directive = {
  mounted(el: Els, binding: DirectiveBinding) {
    if(typeof binding.value !== 'function') {
      throw new Error('v-throttle must be a function')
    }
    let timer: number | null = null
    el.__handleClick__ = () => {
      if(timer) {
        clearInterval(timer)
      }
      if(!el.disabled) {
        el.disabled = true
        binding.value()
        timer = setInterval(() => {
          el.disabled = false
        }, 1000)
      }
    }
    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el: Els) {
    el.removeEventListener('click', el.__handleClick__)
  }
}

export default throttle