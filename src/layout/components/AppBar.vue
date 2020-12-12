<template>
  <div class="app-bar">
    <v-app-bar app clipped color="primary" dense>
      <v-app-bar-nav-icon @click.stop="setDrawer"></v-app-bar-nav-icon>
      <v-icon class="mx-4" large color="#fff">
        mdi-cloud
      </v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title white--text">CLOUD TOOL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SettingModule } from '@/store/modules/setting'

@Component
export default class AppBar extends Vue {
  /**
   * @description 关闭抽屉
   */
  setDrawer () {
    const drawer = SettingModule.drawer
    SettingModule.setDrawer(!drawer)
  }
}
</script>

<style lang="less" scoped>
.title {
  color: rgba(0, 0, 0, 0.54);
}
</style>
