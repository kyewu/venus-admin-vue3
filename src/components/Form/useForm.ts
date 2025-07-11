import type { VFormSchema } from "./types"

export function useForm(schema: VFormSchema) {
  const model = ref<any>()
  const rules = ref<any>()

  onBeforeMount(() => {
    // Initialize model and rules if needed
    model.value = setForm(schema || [])
    rules.value = setRules(schema || [])
  })

  function setForm(arr: any[]) {
    const obj = {}
    arr.forEach((item) => {
     if(item.value) {
      obj[item.prop] = item.value
     }else if(item.schema?.length) {
      item.schema.forEach((child: any) => {
        if(child.prop) {
          obj[child.prop] = child.value
        }
      })
     } else if(item.prop) {
      obj[item.prop] = item.value
     }
    })
    return obj
  }

  function setRules(arr: any[]) {
    let formRules = {}
    arr.forEach((item) => {
      if (item.prop && item.rules) {
        formRules[item.prop] = item.rules
      }
      if (item.schema && item.schema.length) {
        formRules = { ...formRules, ...setRules(item.schema) }
      }
    })
    return formRules
  }

  function flatObj(obj) {
    let result = {}
    if (typeof obj !== 'object') return result
    for (const key in obj) {
      if (
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key]) &&
        Object.keys(obj[key]).length
      ) {
        result = { ...result, ...flatObj(obj[key]) }
      } else {
        if (!key.startsWith('form')) {
          result[key] = obj[key]
        }
      }
    }

    return result
  }

  return {
    model,
    rules,
    setForm,
    flatObj,
    formValue: computed(() => flatObj(model.value)),
  }
}
