import { useUserStore } from "@/stores/user";
import type { Directive, DirectiveBinding } from "vue";

const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const roles = useUserStore().roles
    const checkPermission = () => {
      if (typeof value === 'string') {
        el.style.display = roles.includes(value) ? 'block' : 'none'
      }
      if (Array.isArray(value)) {
        el.style.display = roles.some(role => value.includes(role)) ? 'block' : 'none'
      }
    }

    checkPermission()
    useUserStore().$subscribe((mutations, state) => {
      console.log(mutations)
      console.log(state)
      checkPermission()
    })
  }
}

export default permission