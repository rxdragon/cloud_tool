<template>
  <div class="check-picture-order">
    <!-- 搜索框 -->
    <v-row class="search-box" align="end" no-gutters>
      <v-col cols="9" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          label="海马体订单号"
          hideDetails
          clearable
          v-model.trim="himoOrder"
          @keyup.native.enter="searchHimoOrder"
        />
      </v-col>
      <v-col
        cols="3" class="button-box pl-6"
        sm="4" md="4" lg="4" xl="4"
      >
        <v-btn class="search-box" color="primary" @click="searchHimoOrder">查询</v-btn>
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

    <!-- 列表 -->
    <div class="search-main mt-6" v-if="loading || onlineInfo">
      <!-- 搜索内容 -->
      <v-skeleton-loader
        :loading="loading"
        transition="scale-transition"
        type="list-item-three-line"
      >
        <v-card class="elevation-0">
          <v-card-title class="text-h6 d-flex align-baseline justify-space-between pb-0">
            <span>
              是否可以进入在线看片：
              <span :class="isOnline ? 'success--text' : 'red--text'" class="text-h4 text--light-4">
                {{ isOnline ? '是' : '否' }}
              </span>
            </span>
          </v-card-title>

          <v-card-title v-if="!isOnline" class="subtitle-1 d-flex align-baseline justify-space-between pb-0">
            <span>
              错误信息：<span class="red--text text--light-4">{{ errInfo }}</span>
            </span>
          </v-card-title>

          <v-card-title class="subtitle-1 pb-0" v-if="isOnline">在线看片订单信息：</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0" v-for="(wathcRecordItem, wathcRecordIndex) in onlineInfo" :key="wathcRecordIndex">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">在线看片号：</span>
                <span class="content">{{ wathcRecordItem.recordNo }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">状态：</span>
                <span class="content" :class="wathcRecordItem.state === 'closed' && 'red--text'">{{ wathcRecordItem.stateCN }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">转门店看片：</span>
                <span class="content">{{ wathcRecordItem.toOffline ? '是' : '否' }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">产品：</span>
                <span class="content">{{ wathcRecordItem.productInfos.join('，') || '-' }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">绑定时间：</span>
                <span class="content">{{ wathcRecordItem.bindAt || '-' }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">最后一次反馈：</span>
                <span class="content">{{ wathcRecordItem.recordLastAt || '-' }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">线下绑定时间：</span>
                <span class="content">{{ wathcRecordItem.offlineBindAt || '-' }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">线下完成时间：</span>
                <span class="content">{{ wathcRecordItem.offlineFinishAt || '-' }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-skeleton-loader>
    </div>

    <div class="no-data" v-else>
      <v-img :src="require('../../assets/no_data.png')"></v-img>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as PictureOnlineApi from '@/api/pictureOnlineApi'

@Component
export default class CheckPictureOrder extends Vue {
  private himoOrder: number | string = ''
  private onlineInfo: any = null
  private cloudInfo: any = null
  private isOnline: boolean = false
  private loading: boolean = false
  private orderTags: string[] = []
  private errInfo: string = ''

  async created () {
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
    if ((clipboardText.includes('T') || clipboardText.includes('X'))) {
      let pointIndex = clipboardText.indexOf('T')
      if (pointIndex < 0) pointIndex = clipboardText.indexOf('X')
      const realOrder = clipboardText.substring(pointIndex, (pointIndex + 17))
      const reg = /^[A-Z]\d{16}$/
      if (reg.test(realOrder)) {
        const findSameTag = this.orderTags.find(item => item === realOrder)
        if (!findSameTag) this.orderTags.unshift(realOrder)
      }
    }
  }

  /**
   * @description 检查是否可以进入在线看片
   */
  async searchHimoOrder () {
    if (!this.himoOrder) return this.$message.warning('请输入正确的订单号信息')
    try {
      this.loading = true
      const req = { orderNum: this.himoOrder }
      const res = await PictureOnlineApi.checkPictureOnlineOrder(req)
      this.isOnline = res.isOnline
      this.onlineInfo = res.onlineStream
      this.cloudInfo = res.cloudStream
      this.errInfo = res.errInfo
    } finally {
      this.loading = false
    }
  }

  /**
   * @description 监听删除节点
   */
  onCleanTag (tagIndex: number) {
    this.orderTags.splice(tagIndex, 1)
  }

  /**
   * @description 监听选中标签
   */
  onSelectTag (tag: string) {
    this.himoOrder = tag
    this.searchHimoOrder()
  }
}
</script>

<style lang="less" scoped>
.label {
  display: inline-block;
  width: 100px;
}

.no-data {
  width: 70vw;
  max-width: 300px;
  margin: 100px auto;
}
</style>
