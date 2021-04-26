<template>
  <div class="order-timeline-query">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- 搜索区域 -->
    <v-container fluid>
      <v-row class="search-title" align="end" dense>
        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
          <v-text-field
            label="订单号"
            hideDetails
            clearable
            v-model.trim="seachOrder"
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="12" sm="3" md="4" lg="4" xl="4">
          <v-btn color="primary" @click="showTimeLine(seachOrder)">查询</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <TimeLine v-if="timeLineDetail" :seach-order="seachOrder"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TimeLine from './components/TimeLine.vue'

@Component({
  components: { TimeLine }
})
export default class OrderTimeLineQuery extends Vue{
  private loading: any = false
  private timeLineDetail: boolean = false
  private seachOrder: string = ''

  /**
   * @description 显示订单详情组件
   */
  async showTimeLine (orderId: any) {
    const orderNo = orderId || ''
    this.loading = true
    if (!orderNo){
      this.loading = false
      return this.$message.warning('缺少订单信息')
    }
    else {
      this.loading = false
      this.timeLineDetail = true
    }
  }
  
}
</script>
