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
    </v-row>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as PictureOnlineApi from '@/api/pictureOnlineApi'

@Component
export default class CheckPictureOrder extends Vue {
  private himoOrder: number | string = '2019050388060596'

  /**
   * @description 检查是否可以进入在线看片
   */
  async searchHimoOrder () {
    if (!this.himoOrder) return this.$message.warning('请输入正确的订单号信息')
    const orderId = this.himoOrder
    await PictureOnlineApi.checkPictureOnlineOrder(orderId)
  }
}
</script>
