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
// import * as SessionTool from '@/utils/sessionTool'
// import * as UserApi from '@/api/userApi'

@Component({
  components: { ServiceWorkerUpdatePopup }
})
export default class App extends Vue {
  created () {
    PermissionModule.SET_ROUTES([])
  }

  mounted () {
    // window.onpageshow = () => {
    //   console.log('onpageshow')
    //   const uuid = SessionTool.getUserUUID()
    //   if (!uuid) return
    //   const req = { uuid }
    //   const xStreamId = UserApi.getXstreamId(req)
    //   alert(xStreamId)
    // }
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
