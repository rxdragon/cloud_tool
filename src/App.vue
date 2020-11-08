<template>
  <v-app>
    <transition name="app-transform" mode="out-in">
      <router-view />
    </transition>
    <service-worker-update-popup />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PermissionModule } from '@/store/modules/permission'
import ServiceWorkerUpdatePopup from '@/components/ServiceWorkerUpdatePopup/index.vue'

@Component({
  components: { ServiceWorkerUpdatePopup }
})
export default class App extends Vue {
  created () {
    PermissionModule.SET_ROUTES([])
  }

  mounted () {
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault()
    }, { passive: false })
    // window.addEventListener('beforeinstallprompt', function (e: any) {
    //   e.userChoice.then(function (choiceResult: any) {
    //     console.log(choiceResult)
    //     if (choiceResult.outcome === 'accept') {
    //       // 用户将站点添加至桌面
    //     } else {
    //       // 用户取消安装
    //     }
    //   })
    // })
    // function sendMessageToSW (msg: string): void {
    //   console.log(navigator.serviceWorker.controller)
    //   if (!navigator.serviceWorker.controller) return
    //   navigator.serviceWorker.controller.postMessage(msg)
    // }
    // sendMessageToSW('helloword')
  }
}
</script>

<style>
.theme--light.v-application {
  background-color: #f0f2f5 !important;
}
</style>
