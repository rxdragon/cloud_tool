/* eslint-disable no-unused-vars */
import Vue from 'vue'

interface Message extends Function {
  success: (message: string, options: any = {}) => any,
  info: (message: string, options: any = {}) => any,
  error: (message: string, options: any = {}) => void,
  warning: (message: string, options: any = {}) => any
}

type message = Message

declare module "vue/types/vue" {
  interface Vue {
    $message: Message,
    $delayLoading: Function
  }
}

declare module 'axios' {
  interface AxiosRequestConfig {
    retry?: number,
    retryDelay?: number
  }

  interface AxiosInstance {
    defaults: AxiosRequestConfig
  }
}
