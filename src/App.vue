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
}
</script>

<style>
html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.theme--light.v-application {
  background-color: #eaecf0 !important;
}

.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #7c8b97 !important;
}
</style>
