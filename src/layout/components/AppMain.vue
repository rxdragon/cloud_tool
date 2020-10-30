<template>
  <v-main>
    <v-container class="module">
      <router-view :key="key" />
      <v-overlay :value="pageLoading">
        <v-progress-circular color="#1976D2" indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SettingModule } from '@/store/modules/setting'

@Component
export default class AppMain extends Vue {
  get key () {
    return this.$route.path
  }

  get pageLoading () {
    return SettingModule.pageLoading
  }
}
</script>

<style lang="less" scoped>
.module {
  background-color: #f0f2f5;
}
</style>
