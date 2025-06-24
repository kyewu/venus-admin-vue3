import type { App, Directive } from 'vue'

const modules = import.meta.glob('./modules/*.ts', {
  eager: true,
  import: 'default'
})

const directives = {
  install: (app: App) => {
    Object.entries(modules).forEach(([key, value]) => {
      const directiveName = (key as string).replace('./modules/', '').replace('.ts', '')
      app.directive(directiveName, value as Directive)
    })
  }
}

export function setupDirective(app: App) {
  app.use(directives)
}