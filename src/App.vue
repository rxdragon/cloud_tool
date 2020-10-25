<template>
  <v-app>
    <transition name="app-transform" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PermissionModule } from '@/store/modules/permission'

@Component
export default class App extends Vue {
  created () {
    PermissionModule.SET_ROUTES([])
  }

  mounted () {
    function sendMessageToSW (msg: string): void {
      console.log(navigator.serviceWorker.controller)
      if (!navigator.serviceWorker.controller) return
      navigator.serviceWorker.controller.postMessage(msg)
    }
    sendMessageToSW('helloword')
  }
}
</script>
