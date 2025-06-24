
import type { Directive, DirectiveBinding } from "vue"

interface Els extends HTMLElement {
  __handleClick__: () => void
}

const debounce: Directive = {
  mounted(el: Els, binding: DirectiveBinding) {
    if(typeof binding.value !== 'function') {
      throw new Error('v-debounce must be a function')
    }
    let timer: number | null = null
    el.__handleClick__ = () => {
      if(timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 500)
    }
    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el: Els) {
    el.removeEventListener('click', el.__handleClick__)
  }
}

export default debounce