<template>
  <v-main>
    <v-container ref="scroll-main" class="module">
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
import PullToRefresh from 'pulltorefreshjs'

@Component
export default class AppMain extends Vue {
  get key () {
    return this.$route.path
  }

  get pageLoading () {
    return SettingModule.pageLoading
  }

  mounted () {
    PullToRefresh.init({
      mainElement: '.module',
      triggerElement: '.module',
      instructionsPullToRefresh: '下拉刷新',
      instructionsReleaseToRefresh: ' ',
      instructionsRefreshing: ' ',
      shouldPullToRefresh: () => {
        if (!this.$refs['scroll-main']) return false
        const scrollTop = (this.$refs['scroll-main'] as HTMLDivElement).scrollTop
        return scrollTop <= 10
      },
      onRefresh: () => {
        console.log(1)
        this.refresh()
      }
    })
  }

  refresh () {
    const view = this.$route
    const { fullPath } = view

    this.$nextTick(() => {
      this.$router.replace({
        path: '/redirect' + fullPath
      })
    })
  }
}
</script>

<style lang="less" scoped>
.module {
  background-color: #eaecf0;
  height: calc(100vh - 48px);
  padding-bottom: 80px;
  overflow-y: scroll;
}
</style>
