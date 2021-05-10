<template>
  <div class="level-search">
    <!-- 搜索框 -->
    <v-row class="search-box" align="end">
      <v-col cols="9" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          label="伙伴id"
          hideDetails
          prepend-icon="mdi-card-account-details-outline"
          clearable
          v-model.trim="staffId"
          @keyup.native.enter="seachLevelInfo"
        />
      </v-col>
      <v-col cols="9" sm="6" md="4" lg="4" xl="4">
        <v-menu
        v-model="showDatePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="checkTime"
            label="请输入核算时间"
            prepend-icon="mdi-calendar"
            hideDetails
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="checkTime"
          @input="showDatePicker = false"
        ></v-date-picker>
      </v-menu>
      </v-col>
      <v-col
        cols="3" class="button-box pl-6"
        sm="4" md="4" lg="4" xl="4"
      >
        <v-btn class="search-box" color="primary" @click="seachLevelInfo">查询</v-btn>
      </v-col>
    </v-row>

    <!-- 列表 -->
    <div class="search-main mt-6" v-if="Object.values(staffInfo).length">
      <!-- 搜索内容 -->
      <v-skeleton-loader
        :loading="loading"
        transition="scale-transition"
        type="list-item-three-line"
      >
        <v-card class="elevation-0">
          <v-card-title class="text-h6 d-flex align-baseline justify-space-between pb-0">
            <span>当前等级：<span class="text-h4 yellow--text text--darken-4">{{ staffInfo.level }}</span> Level</span>
            <span>核算时等级：<span class="text-h4 yellow--text text--darken-4">{{ checkLog.checkLevel }}</span> Level</span>
            <span class="text--accent-3" :class="staffInfo.identity | filterStateClass">{{ staffInfo.identityToCN }}</span>
          </v-card-title>

          <v-card-title class="subtitle-1 pb-0">海草：</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">当前海草：</span>
                <span class="content">{{ checkLog.checked_exp }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">所需海草：</span>
                <span class="content"> >= {{ matchLevel.needExp }}</span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">是否达标：</span>
                <span class="content text--darken-1" :class="checkLog.isExpSuccess ? 'green--text' : 'red--text'">{{ checkLog.isExpSuccess ? 'success' : 'fail' }}</span>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-title class="subtitle-1 pb-0">当前抽查张数：</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">当前升级抽查张数</span>
                <span class="content" :class="checkLog.reachUpdateCheckCount ? 'green--text' : 'red--text'">
                  {{ checkLog.checked_level_up_num }} / {{ matchLevel.upDateSpotCount }}
                </span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">当前降级抽查张数</span>
                <span class="content" :class="checkLog.reachDownCheckCount ? 'green--text' : 'red--text'">
                  {{ checkLog.checked_level_down_num }} / {{ matchLevel.downDateSpotCount }}
                </span>
              </v-col>
            </v-row>
          </v-card-text>
          
          <v-card-title class="subtitle-1 pb-0">云学院抽查分数：</v-card-title>
          <v-card-text>
            <v-row align="center" no-gutters class="mx-0">
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">当前升级抽查分数</span>
                <span class="content" :class="checkLog.canGradeUpdate ? 'green--text' : 'red--text'">
                  {{ checkLog.checked_level_up_avg_score }} / {{ matchLevel.upNeedCheckScore }}
                </span>
              </v-col>
              <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
                <span class="label">当前降级抽查分数</span>
                <span class="content" :class="checkLog.canGradeDown ? 'green--text' : 'red--text'">
                  {{ checkLog.checked_level_down_avg_score }} / {{ matchLevel.downCheckScore }}
                </span>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-title class="subtitle-1 pb-0">
            是否可以升级：<span :class="checkLog.canUpdate ? 'green--text' : 'red--text'">{{ checkLog.canUpdate ? '是' : '否' }}</span>
          </v-card-title>

          <v-card-title class="subtitle-1 pb-4">
            是否可以降级：<span :class="checkLog.canDown ? 'green--text' : 'red--text'">{{ checkLog.canDown ? '是' : '否' }}</span>
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
          <template v-slot:[`item.needRetouchTime`]="{ item }">
            {{ item.needRetouchTime || '-' }} min
          </template>
          <template v-slot:[`item.needExp`]="{ item }">
            {{ item.needExp || '-' }}
          </template>
          <template v-slot:[`item.needReturnQuota`]="{ item }">
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
import LevelConfig from '@/views/cloud-center/levelConfig'


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
  private staffId: number | string = '' // 伙伴id
  private checkTime: string = '' // 升级检测时间

  private showDatePicker: boolean = false // 是否显示菜单

  private staffInfo: any = {}
  private checkLog: any = {}

  private loading: boolean = false
  private headers = [
    { text: '等级', align: 'start', value: 'level' },
    { text: '海草数', value: 'needExp' },
    { text: '升级抽查张数', value: 'upDateSpotCount' },
    { text: '降级抽查张数', value: 'downDateSpotCount' },
    { text: '升级抽查需要分数', value: 'upNeedCheckScore' },
    { text: '降级抽查需要分数', value: 'downCheckScore' },
  ]
  private matchLevel: any = []
  private levelTable: any = Object.values(LevelConfig)

  /**
   * @description 查询订单信息
   */
  async seachLevelInfo () {
    if (!Number(this.staffId)) return this.$message.warning('请输入正确的员工id')
    if (!this.checkTime) return this.$message.warning('请输入查询时间')
    try {
      this.loading = true
      const req = {
        staffId: Number(this.staffId),
        date: this.checkTime
      }
      const res = await CloudApi.getStaffLevel(req)
      this.staffInfo = res.staffInfo
      this.checkLog = res.checkLog
      this.matchLevel = res.matchLevel
    } finally {
      this.loading = false
    }
  }
  
  /**
   * @description 获取订单信息
   */
  filterItemColor (item: any) {
    if (item.level === this.checkLog.checkLevel) return 'red--text'
  }
}
</script>

<style lang="less" scoped>
.label {
  display: inline-block;
  width: 120px;
}

.no-data {
  width: 70vw;
  max-width: 300px;
  margin: 100px auto;
}
</style>
