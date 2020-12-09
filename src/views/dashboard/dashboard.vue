<template>
  <div class="dashboard">
    <v-btn color="blue lighten-1" text @click="initPage">刷新</v-btn>
    <v-container>
      <v-row>
        <!-- 待修流水数量 -->
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-card class="mx-auto text-center pa-0" color="#00b1b7" dark>
            <v-card-text>
              <div class="number-label">待修流水数量</div>
              <div class="number-font">
                <count-to :end-value="waitRetouchStreamQueueLength" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- 修图师排队数 -->
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-card class="mx-auto text-center pa-0" color="#00b1b7" dark>
            <v-card-text>
              <div class="number-label">修图师排队数</div>
              <div class="number-font">
                <count-to :end-value="retoucherQueueLength" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- 修修兽日收入走势 -->
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-card class="mx-auto text-center pa-0" color="#00b1b7" dark>
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :value="neer7DaysValue"
                  color="white"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">
                    {{ neer7DaysLabel[item.index] }} -
                    ¥{{ item.value }}
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>
        
            <v-card-text>
              <div class="display-1 font-weight-thin">修修兽日收入走势</div>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-col>

        <!-- 修修兽月收入走势 -->
        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
          <v-card class="mx-auto text-center pa-0" color="#00b1b7" dark>
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :value="monthInfoValue"
                  :auto-line-width="true"
                  showLabels
                  color="white"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">
                    {{ monthInfoLable[item.index] }}月
                    ¥{{ item.value }}w
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>
        
            <v-card-text>
              <div class="display-1 font-weight-thin">修修兽月收入走势</div>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CountTo from '@/components/CountTo/index.vue'

import * as ShowpicApi from '@/api/showpicApi'
import * as CloudApi from '@/api/cloudApi'

let pollingInit: number| null = null

@Component({
  components: { CountTo }
})
export default class Dashboard extends Vue {
  private neer7DaysLabel: string[] = []
  private neer7DaysValue: number[] = []
  private monthInfoLable: string[] = []
  private monthInfoValue: number[] = []
  private waitRetouchStreamQueueLength: number = 0
  private retoucherQueueLength: number = 0

  created () {
    this.initPage()
    if (pollingInit) return
    pollingInit = setInterval(() => {
      this.initPage()
    }, 30000)
  }

  activated () {
    this.getSaleInfo()
    this.getQueueLength()
    this.getRetoucherQueueLength()
  }

  destroyed () {
    console.log('销毁')
    if (pollingInit) clearInterval(pollingInit)
    pollingInit = null
  }

  initPage () {
    for (let index = 0; index < 7; index++) {
      this.neer7DaysValue.push(0)
      this.monthInfoValue.push(0)
    }
    this.getSaleInfo()
    this.getQueueLength()
    this.getRetoucherQueueLength()
  }

  /**
   * @description 获取排队数量
   */
  async getQueueLength () {
    this.waitRetouchStreamQueueLength = await CloudApi.getQueueLength()
  }

  async getRetoucherQueueLength () {
    this.retoucherQueueLength = await CloudApi.getRetoucherQueueLength()
  }

  async getSaleInfo () {
    const data = await ShowpicApi.getSaleInfo()
    this.neer7DaysValue = data.neer7Days.map((item: { sum: any }) => item.sum)
    this.neer7DaysLabel = data.neer7Days.map((item: { day: any }) => item.day)
    this.monthInfoLable = data.monthInfo.map((item: { month: any }) => item.month)
    this.monthInfoValue = data.monthInfo.map((item: { sum: number }) => {
      const sum: number = item.sum / 10000
      const sumFilter: number = Number(sum.toFixed(1))
      return sumFilter
    })
  }
}
</script>

<style lang="less" scoped>
.number-label {
  font-size: 1rem;
}

.number-font {
  font-family: number;
  font-size: 6rem;
  line-height: 1;
  transform: rotateX(30deg);
  transform-origin: bottom;
}
</style>
