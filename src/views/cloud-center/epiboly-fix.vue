<template>
  <div class="epiboly-fix">
    <v-alert type="warning" border="bottom" colored-border elevation="2" class="text-subtitle-2 warning--text" dense v-if="!isLogin">该功能需要云端权限，请先登录哦～</v-alert>

    <!-- 搜索区域 -->
    <v-row class="search-box" align="end" no-gutters>
      <v-col cols="12">
        <v-text-field
          label="云端流水号"
          hideDetails
          clearable
          v-model.trim="seachStreamNum"
          @keyup.native.enter="fixEpibolyStream"
        />
      </v-col>

      <v-col
        cols="12" class="button-box mt-6"
      >
        <v-btn class="search-box mr-4" color="primary" @click="fixEpibolyStream">修复外包卡单</v-btn>
        <v-btn class="search-box white--text" color="green" @click="fixShowPicStream">修复修修兽状态问题</v-btn>
      </v-col>
      
      <v-col cols="12" class="button-box pl-0">
        <v-chip-group active-class="primary--text">
          <v-chip
            v-for="(tag, tagIndex) in orderTags" :key="tagIndex"
            @click:close="onCleanTag(tagIndex)"
            @click="onSelectTag(tag)"
            close
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as CloudApi from '@/api/cloudApi'
import { UserStoreModule } from '@/store/modules/userStore'
import { SettingModule } from '@/store/modules/setting'


@Component
export default class EpibolyFix extends Vue {
  private seachStreamNum: string = ''
  private orderTags: string[] = []
  private isLogin: boolean = false

  async created () {
    this.isLogin = Boolean(UserStoreModule.xStreamID)
    try {
      if (document.hidden) return
      await this.initSeachData()
    } catch (error) {
      console.error(error)
    }

    window.onfocus = async () => {
      await this.initSeachData()
    }
  }

  destroyed () {
    window.onfocus = null
  }

  async initSeachData () {
    const clipboardText = await navigator.clipboard.readText()
    if (clipboardText.includes('C')) {
      const pointIndex = clipboardText.indexOf('C')
      const realOrder = clipboardText.substring(pointIndex, (pointIndex + 17))
      const reg = /^[A-Z]\d{16}$/
      if (reg.test(realOrder)) {
        const findSameTag = this.orderTags.find(item => item === realOrder)
        if (!findSameTag) this.orderTags.unshift(realOrder)
      }
    }
  }

  /**
   * @description 修复外包流水卡单
   */
  async fixEpibolyStream () {
    try {
      if (!this.isLogin) return this.$message.warning('请先登录')
      const req = { streamNum: this.seachStreamNum }
      SettingModule.loading(true)
      await CloudApi.apiSubmitStream(req)
      this.seachStreamNum = ''
      this.$message.success('修复成功')
    } catch (error) {
      this.$message.error(`修复失败，${String(error)}`)
    } finally {
      SettingModule.loadingClose()
    }
  }

  /**
   * @description 修复外包流水卡单
   */
  async fixShowPicStream () {
    try {
      if (!this.isLogin) return this.$message.warning('请先登录')
      const req = { streamNum: this.seachStreamNum }
      SettingModule.loading(true)
      await CloudApi.fixShowPicStream(req)
      this.seachStreamNum = ''
      this.$message.success('修复修修兽卡单成功')
    } catch (error) {
      this.$message.error(`修复修修兽卡单失败，${String(error)}`)
    } finally {
      SettingModule.loadingClose()
    }
  }
}
</script>
