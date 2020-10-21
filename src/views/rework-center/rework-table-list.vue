<template>
  <div class="rework-table-list">
    <v-row class="search-box" align="center" >
      <v-col
        cols="12" class="no-padding"
        sm="6" md="4" lg="4" xl="4"
      >
        <v-text-field
          label="流水号"
          hideDetails
          clearable
          v-model.trim="seachOrder"
          @keyup.native.enter="seachData"
        />
      </v-col>
      <v-col
        cols="12" class="button-box no-padding"
        sm="4" md="4" lg="4" xl="4"
      >
        <v-btn class="search-box" color="primary" @click="seachData">查询</v-btn>
        <upload-excel btn-text="批量导入" :header-data="headerKeys" :on-success="handleSuccess" :before-upload="beforeUpload"/>
      </v-col>
      <v-col
        cols="12" v-if="seachOrderArr.length"
        sm="12" md="12" lg="12" xl="12"
      >
        <v-chip v-for="(chipItem, chipIndex) in seachOrderArr" :key="chipIndex" color="primary">{{ chipItem }}</v-chip>
      </v-col>
    </v-row>
    <!-- 表格 -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="tableLoading"
      show-expand
      hide-default-footer
      disable-pagination
      disable-sort
      class="v-data-table"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-timeline class="time-line" align-top dense>
            <v-timeline-item v-for="(reworkItem, index) in item.punishLogsInfo" :key="index" color="#1876D2">
              <template v-slot:opposite>
                <span>第{{ index + 1 }}次退回</span>
              </template>
              <!-- 惩罚信息 -->
              <v-card class="elevation">
                <v-card-title class="headline subtitle-1">惩罚信息</v-card-title>
                <v-card-text class="flex-item">
                  <span>触发机制</span>
                  <span>{{ reworkItem.event }}</span>
                </v-card-text>
                <v-card-text class="flex-item">
                  <span>扣除海草</span>
                  <span>{{ reworkItem.punishExp }}</span>
                </v-card-text>
                <v-card-text class="flex-item">
                  <span>扣除金额</span>
                  <span>{{ reworkItem.punishMoney }}</span>
                </v-card-text>
                <v-card-text class="flex-item">
                  <span>扣除伙伴</span>
                  <span>{{ reworkItem.punishStaff }}</span>
                </v-card-text>
                <v-card-text class="flex-item">
                  <span>被退流水</span>
                  <span>{{ reworkItem.streamNum }}</span>
                </v-card-text>
                <v-divider class="divider-box"></v-divider>
                <v-card-text class="flex-item">
                  <span>生成新流水</span>
                  <span>{{ item.reworkTimeInfo[index].newStreamNum }}</span>
                </v-card-text>
                <v-card-text class="flex-item">
                  <span>重修类型</span>
                  <span>{{ item.reworkTimeInfo[index].reworkPhotoTypeCN }}</span>
                </v-card-text>
                <v-card-text class="flex-item">
                  <span>是否在线</span>
                  <span>{{ item.reworkTimeInfo[index].isOnline }}</span>
                </v-card-text>
                <v-card-text class="flex-item">
                  <span>退回照片信息</span>
                  <span>{{ item.reworkTimeInfo[index].reworkPhotoIds }}</span>
                </v-card-text>
                <v-card-text class="flex-item">
                  <span>重修扣除海草</span>
                  <span>{{ item.reworkTimeInfo[index].exp }}</span>
                </v-card-text>
                <v-card-text class="flex-item">
                  <span>重修扣除流水</span>
                  <span>{{ item.reworkTimeInfo[index].money }}</span>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import * as OrderApi from '@/api/orderApi'
import UploadExcel from '@/components/UploadExcel/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import { SettingModule } from '@/store/modules/setting'

@Component({
  components: { UploadExcel }
})
export default class ReworkTableList extends Vue {
  private tableLoading: boolean = false
  private seachOrder: string = ''
  private headerKeys: string[] = ['streamNum']
  private headers: object[] = [
    { text: '原流水号', value: 'streamNum' },
    { text: '修图师', value: 'RetoucherId' },
    { text: '原本经验', value: 'exp' },
    { text: '原本金钱(<=35点为0)', value: 'income' },
    { text: '退单次数', value: 'reworkTimes' },
    { text: '', value: 'data-table-expand' }
  ]
  private desserts: object[] = []
  private seachOrderArr: string[] = []

  /**
   * @description 搜索表格
   */
  async seachData () {
    if (!this.seachOrder) return this.$message.warning('请输入流水号')
    try {
      SettingModule.loading(true)
      const data = await OrderApi.getOrderList(this.seachOrder)
      this.desserts = data
      this.seachOrderArr = [this.seachOrder]
    } finally {
      SettingModule.loadingClose()
    }
  }

  /**
   * @description 批量搜索
   */
  async batchSearch (streamArr: string[]) {
    let list: object[] = []
    for (const streamItem of streamArr) {
      const data = await OrderApi.getOrderList(streamItem)
      list = [...list, ...data]
    }
    return list
  }

  /**
   * @description 上传成功
   */
  async handleSuccess ({ results }: any) {
    try {
      SettingModule.loading(true)
      results.splice(0, 1)
      const streamArr = results.map((item: { streamNum: any }) => item.streamNum)
      const data = await this.batchSearch(streamArr)
      this.desserts = data
      this.seachOrderArr = streamArr
    } finally {
      SettingModule.loadingClose()
    }
  }

  /**
   * @description 上传前
   */
  beforeUpload () {
    return true
  }
}
</script>

<style lang="scss" scoped>
.button-box {
  display: flex;

  .search-box {
    margin-right: 12px;
  }
}

.v-data-table {
  & >>> tbody tr.v-data-table__expanded__content {
    box-shadow: inset 0 4px 8px -5px rgba(50, 50, 50, 0.55), inset 0 -4px 8px -5px rgba(50, 50, 50, 0.55);
  }
}

.flex-item {
  display: flex;
  justify-content: space-between;
  padding-top: 0;
}

.divider-box {
  padding-bottom: 16px;
}
</style>


<style lang="scss">
.v-data-table tbody tr.v-data-table__expanded__content {
  box-shadow: inset 0 4px 8px -5px rgba(50, 50, 50, 0.35), inset 0 -4px 8px -8px rgba(50, 50, 50, 0.35);
}

.v-timeline--dense .v-timeline-item__body {
  max-width: 330px;
  margin-right: auto;
}
</style>
