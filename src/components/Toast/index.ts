import Vue from 'vue'
import Toast from './Toast.vue'
import vuetify from '@/plugins/vuetify'

let cmp: any = null
const queue: any[] = []
const globalOptions: any = {}
const property = globalOptions.property || '$message'

function createCmp (options: any) {
  Vue.mixin({
    beforeCreate () {
      this.$vuetify = Vue.observable(vuetify.framework)
    },
  })
  const component = new Vue(Toast)
  const componentOptions = { ...Vue.prototype[property].globalOptions, ...options }

  if (componentOptions.slot) {
    component.$slots.default = componentOptions.slot
    delete componentOptions.slot
  }

  Object.assign(component, componentOptions)
  document.body.appendChild(component.$mount().$el)
  return component
}

function show (message: string, options: any = {}): void {
  if (cmp) {
    const isQueueable = options.queueable !== undefined ? options.queueable : globalOptions.queueable

    if (isQueueable) {
      queue.push({ message, options })
    }
    else {
      cmp.close()
      queue.unshift({ message, options })
    }

    return
  }

  options.message = message
  cmp = createCmp(options)
  cmp.$on('statusChange', (isActive: boolean, wasActive: boolean) => {
    if (wasActive && !isActive) {
      cmp.$nextTick(() => {
        cmp.$destroy()
        cmp = null

        if (queue.length) {
          const toast = queue.shift()
          show(toast.message, toast.options)
        }
      })
    }
  })
}

function shorts (options: any) {
  const colors = ['success', 'info', 'error', 'warning']
  const methods: any = {}

  colors.forEach(color => {
    methods[color] = (message: string, options: any) => show(message, { color, ...options })
  })

  if (options.shorts) {
    for (let key in options.shorts) {
      const localOptions = options.shorts[key]
      methods[key] = (message: string, options: any) => show(message, { ...localOptions, ...options })
    }
  }

  return methods
}

function getCmp () {
  return cmp
}

function clearQueue () {
  return queue.splice(0, queue.length)
}



Vue.prototype[property] = Object.assign(show, {
  globalOptions,
  getCmp,
  clearQueue,
  ...shorts(globalOptions)
})

const Message = Object.assign(show, {
  globalOptions,
  getCmp,
  clearQueue,
  ...shorts(globalOptions)
})

export default Message
