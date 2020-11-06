<template>
  <div class="level-search">
    <!-- 搜索框 -->
    <v-row class="search-box" align="end" no-gutters>
      <v-col cols="9" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          label="伙伴id"
          hideDetails
          clearable
          v-model.trim="staffId"
          @keyup.native.enter="seachLevelInfo"
        />
      </v-col>
      <v-col
        cols="3" class="button-box pl-6"
        sm="4" md="4" lg="4" xl="4"
      >
        <v-btn class="search-box" color="primary" @click="seachLevelInfo">查询</v-btn>
      </v-col>
    </v-row>

    <!-- 列表 -->
    <div class="search-main mt-6" v-if="loading || levelTable.length">
      <!-- 搜索内容 -->
      <v-skeleton-loader
        :loading="loading"
        transition="scale-transition"
        type="list-item-three-line"
      >
        <v-card class="elevation-0">
          <v-card-title class="text-h6 d-flex align-baseline justify-space-between pb-0">
            <span>当前等级：<span class="text-h4 yellow--text text--darken-4">{{ staffInfo.level }}</span> Level</span>
            <span class="text--accent-3" :class="staffInfo.identity | filterStateClass">{{ staffInfo.identityCN }}</span>
          </v-card-title>

          <v-card-title class="subtitle-1 pb-0">海草：</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">当前海草：</span>
                <span class="content">{{ staffInfo.exp }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">所需海草：</span>
                <span class="content"> >= {{ staffInfo.needExp }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">是否达标：</span>
                <span class="content text--darken-1" :class="staffInfo.isExpSuccess ? 'green--text' : 'red--text'">{{ staffInfo.isExpSuccess ? 'success' : 'fail' }}</span>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-title class="subtitle-1 pb-0">均张修图时长：</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">当前修图时长：</span>
                <span class="content">{{ staffInfo.staffRetouchTime }} min</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">所需修图时长：</span>
                <span class="content"> <= {{ staffInfo.needRetouchTime }} min</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">是否达标：</span>
                <span class="content text--darken-1" :class="staffInfo.isRetouchTimeSuccess ? 'green--text' : 'red--text'">{{ staffInfo.isRetouchTimeSuccess ? 'success' : 'fail' }}</span>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-title class="subtitle-1 pb-0">退单率：</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">当前退单率：</span>
                <span class="content">{{ staffInfo.staffReturnRate }}%</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">所需退单率：</span>
                <span class="content"> <= {{ staffInfo.needReturnQuota }}%</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">是否达标：</span>
                <span class="content text--darken-1" :class="staffInfo.isRetouchTimeSuccess ? 'green--text' : 'red--text'">{{ staffInfo.isStaffReturnRateSuccess ? 'success' : 'fail' }}</span>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-title class="subtitle-1 pb-0">
            是否可以升级：<span :class="staffInfo.isExpSuccess ? 'green--text' : 'red--text'">{{ staffInfo.canLevel ? '是' : '否' }}</span>
          </v-card-title>
        </v-card>
      </v-skeleton-loader>

      <!-- 升级表 -->
      <v-skeleton-loader
        :loading="loading"
        transition="scale-transition"
        type="table"
      >
        <v-data-table
          :headers="headers"
          :items="levelTable"
          :disable-pagination="true"
          :disable-sort="true"
          :disable-filtering="true"
          :item-class="filterItemColor"
          hide-default-footer
        >
          <template v-slot:item.needRetouchTime="{ item }">
            {{ item.needRetouchTime || '-' }} min
          </template>
          <template v-slot:item.needExp="{ item }">
            {{ item.needExp || '-' }}
          </template>
          <template v-slot:item.needReturnQuota="{ item }">
            {{ item.needReturnQuota || '-' }} %
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </div>

    <div class="no-data" v-else>
      <v-img :src="require('../../assets/no_data.png')"></v-img>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as CloudApi from '@/api/cloudApi'
import LevelConfig from './levelConfig'

@Component({
  filters: {
    filterStateClass (identify: CloudApi.IDENTIFY) {
      const changeColor = {
        [CloudApi.IDENTIFY.BLUE]: 'light-blue--text',
        [CloudApi.IDENTIFY.MASTER]: 'orange--text',
        [CloudApi.IDENTIFY.MAINTO]: 'pink--text'
      }
      return changeColor[identify] || ''
    }
  }
})
export default class LevelSearch extends Vue {
  private staffId: number | string = ''
  private staffInfo: any = {}
  private loading: boolean = false
  private staffIdTags: [] = []
  private headers = [
    { text: '等级', align: 'start', value: 'level' },
    { text: '海草数', value: 'needExp' },
    { text: '退单率', value: 'needReturnQuota' },
    { text: '均张修图时长(min)', value: 'needRetouchTime' }
  ]
  private levelTable: any = []

  /**
   * @description 查询订单信息
   */
  async seachLevelInfo () {
    if (!Number(this.staffId)) return this.$message.warning('请输入正确的员工id')
    try {
      this.loading = true
      const req = { staffId: Number(this.staffId) }
      this.staffInfo = await CloudApi.getStaffLevel(req)
      this.levelTable = LevelConfig[this.staffInfo.identity as CloudApi.IDENTIFY]
    } finally {
      this.loading = false
    }
  }
  
  /**
   * @description 获取订单信息
   */
  filterItemColor (item: any) {
    if (item.level === this.staffInfo.level) return 'red--text'
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
