import { ElMessage } from "element-plus"
import type { Directive, DirectiveBinding } from "vue"
import { useClipboard} from '@vueuse/core'

interface Els extends HTMLElement {
  copyData: string
  __handleClick__: () => void
}

const copy: Directive = {
  /**
   * Mounted hook, bind event listener to element
   * @param {Els} el - Element that directive is bound to
   * @param {DirectiveBinding} binding - Directive binding object
   * @description
   * 1. Get the copy data from binding value
   * 2. Get the modifiers from binding object
   * 3. Use `useClipboard` to create a copy function
   * 4. Create a click handler that copy the data
   * 5. If `mute` modifier is not present, show a success message
   * 6. Add the click handler to the element
   * 7. Store the handler in the element so it can be removed later
   */
  mounted(el: Els, binding: DirectiveBinding) {
    el.copyData = binding.value
    const { modifiers } = binding
    const { copy } = useClipboard({source: binding.value})
    const handleClick = () => {
      copy(el.copyData)
      if(!modifiers.mute) {
        ElMessage({
          type: 'success',
          message: '复制成功'
        })
      }
    }
    el.addEventListener('click', handleClick)
    el.__handleClick__ = handleClick
  },
  updated(el: Els, binding: DirectiveBinding) {
    el.copyData = binding.value
  },
  beforeUnmount(el: Els) {
    el.removeEventListener('click', el.__handleClick__)
  }
}

export default copy