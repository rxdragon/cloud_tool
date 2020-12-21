<template>
  <div class="picture-search">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- 搜索区域 -->
    <v-row class="search-box" align="end" no-gutters>
      <v-col cols="9" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          label="海马体订单号"
          hideDetails
          clearable
          v-model.trim="seachOrderNum"
          @keyup.native.enter="seachData"
        />
      </v-col>
      <v-col
        cols="3" class="button-box pl-6"
        sm="4" md="4" lg="4" xl="4"
      >
        <v-btn class="search-box" color="primary" @click="seachData">查询</v-btn>
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

    <!-- 订单展示结果区域 -->
    <div class="search-main mt-3" v-if="orderList.length">
      <template v-for="orderItem in orderList">
        <v-tabs
          :key="orderItem.id"
          v-model="orderItem.tab"
          background-color="primary"
          class="elevation-0"
          dark
          grow
        >
          <v-tab href="#order">订单信息</v-tab>
          <v-tab href="#photo">照片信息</v-tab>

          <v-tab-item value="order" >
            <order-card :order-info="orderItem" />
          </v-tab-item>
          <v-tab-item value="photo" >
            <photo-card :order-id="orderItem.id" />
          </v-tab-item>
        </v-tabs>
      </template>
    </div>

    <!-- 暂无数据 -->
    <div class="no-data" v-else>
      <v-img :src="require('../../assets/no_data.png')"></v-img>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as PictureOnlineApi from '@/api/pictureOnlineApi'
import { PictureOnlineOrderInterface } from '@/model/PictureOnlineOrderModel'
import OrderCard from './components/OrderCard.vue'
import PhotoCard from './components/PhotoCard.vue'

@Component({
  components: { OrderCard, PhotoCard }
})
export default class PictureSearch extends Vue {
  private seachOrderNum: string = ''
  private orderList: PictureOnlineOrderInterface[] = []
  private loading: boolean = false
  private orderTags: string[] = []

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
   * @description 搜索数据
   */
  async seachData () {
    try {
      if (this.seachOrderNum.length !== 17) return this.$message.warning('请输入正确的订单号')
      if (!this.seachOrderNum.includes('T') && !this.seachOrderNum.includes('X')) return this.$message.warning('请输入正确的订单号')
      const req = {
        outsideNo: this.seachOrderNum
      }
      this.loading = true
      this.orderList = await PictureOnlineApi.getPictureOnlineByOutsideNo(req)
      if (!this.orderList.length) this.$message.warning('暂无数据')
      await this.$delayLoading()
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
    this.seachOrderNum = tag
    this.seachData()
  }
}
</script>

<style lang="less" scoped>
.search-box {
  margin-left: auto;
}

.search-main {
  .tabs-box {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
}

.no-data {
  width: 70vw;
  max-width: 300px;
  margin: 100px auto;
}
</style>
