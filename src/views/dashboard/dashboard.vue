<template>
  <div class="dashboard">
    <v-container class="grey lighten-5">
      <v-row>
        <v-col
          cols="12" sm="12" md="6"
          lg="6" xl="6"
        >
          <v-card class="mx-auto text-center" color="#00b1b7" dark>
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
              <div class="display-1 font-weight-thin">修修兽近日收入走势</div>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-col>
        <v-col
          cols="12" sm="12" md="6"
          lg="6" xl="6"
        >
          <v-card class="mx-auto text-center" color="#00b1b7" dark>
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

import * as ShowpicApi from '@/api/showpicApi'

@Component
export default class Dashboard extends Vue {
  private neer7DaysLabel: string[] = []
  private neer7DaysValue: number[] = []
  private monthInfoLable: string[] = []
  private monthInfoValue: number[] = []

  created () {
    for (let index = 0; index < 7; index++) {
      this.neer7DaysValue.push(0)
    }
    this.getSaleInfo()
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

  test () {
    Vue.prototype.$notification({
      title: `测试`,
      body: '测试body',
      icon: `https://i2.hdslb.com/bfs/face/c50d8de65bbaad7ccd714d298854181c117863bb.jpg`
    })
  }
}
</script>

<style lang="less" scoped>

</style>
