<template>
  <div class="service-worker-update-popup">
    <v-dialog v-model="dialog" max-width="290" :persistent="true">
      <v-card>
        <v-card-title class="headline">有新的版本更新</v-card-title>
        <v-card-text>
          更新内容。。。
        </v-card-text>
        <!-- 弹框操作 -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="loading" text @click="refreshApp" >
            更新
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ServiceWorkerUpdatePopup extends Vue {
  private dialog: boolean = false
  private refreshing: boolean = false
  private registration: ServiceWorkerRegistration | null = null
  private loading: boolean = false

  mounted () {
    // Listen for swUpdated event and display refresh notification as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
    // Refresh all open app tabs when a new service worker is installed.
    if (!navigator.serviceWorker) return
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  }

  /**
   * @description 更新提示弹框
   */
  showRefreshUI (e: Event) {
    this.registration = (e as CustomEvent).detail
    console.log(this.registration)
    this.dialog = true
  }

  /**
   * @description 更新app
   */
  private refreshApp () {
    // Protect against missing registration.waiting.
    if (!this.registration || !this.registration.waiting) return
    this.registration.waiting.postMessage('skipWaiting')
    this.loading = true
  }
}
</script>

<style lang="less" scoped>
.service-worker-update-popup {

}
</style>
