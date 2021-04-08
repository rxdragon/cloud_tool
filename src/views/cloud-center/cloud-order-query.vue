<template>
  <div class="rework-table-list">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- 搜索区域 -->
    <v-container fluid>
      <v-row class="search-title" align="end" dense>
        <v-col cols="9" sm="4" md="2" lg="2" xl="2">
          <v-text-field
            label="顾客姓名"
            hideDetails
            clearable
            v-model.trim="seachName"
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="9" sm="6" md="4" lg="4" xl="4">
          <v-text-field
            label="订单号"
            hideDetails
            clearable
            v-model.trim="seachOrder"
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="9" sm="6" md="4" lg="4" xl="4">
          <v-text-field
            label="流水号"
            hideDetails
            clearable
            v-model.trim="seachWater"
            @keyup.native.enter="seachData"
          />
        </v-col>
        <v-col cols="9" sm="1" md="1" lg="1" xl="1">
          <v-btn color="primary" @click="seachData">查询</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- 查询结果区域 -->
    <v-data-table
      v-if="seachOrderArr.length"
      :headers="headers"
      :items="desserts"
      :loading="tableLoading"
      hide-default-footer
      disable-pagination
      disable-sort
    >
      <template v-slot:item.orderInfo="{ item }">
        <div>
          <span class="s1">订单号:</span>{{ item.orderInfo.orderNum }}<br />
          <span class="s1">流水号:</span>{{ item.orderInfo.waterNum }}<br />
          <span class="s2">拍摄产品:</span>{{ item.orderInfo.photoProduct
          }}<br />
          <span class="s2">照片数量:</span>{{ item.orderInfo.photoCount }}
        </div>
      </template>
      <template v-slot:item.picFixer="{ item }">
        {{ "修图师：" + item.picFixer.fixer }}
        <br />
        {{ "组长：" + item.picFixer.fixerLeader }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import * as SearchOrderApi from '@/api/searchOrderApi'
import UploadExcel from "@/components/UploadExcel/index.vue"
import { SearchOrderInterface } from '@/model/SearchOrderModel'
import { Component, Vue } from "vue-property-decorator"
import { SettingModule } from "@/store/modules/setting"

@Component({
  components: { UploadExcel },
})
export default class ReworkTableList extends Vue {
  private loading: boolean = false
  private seachOrder: string = ""
  private seachResult: boolean = false
  private headerKeys: string[] = ["streamNum"]
  private headers: object[] = [
    { text: "位置", value: "location" },
    { text: "修图标准", value: "picStandard" },
    { text: "订单信息", value: "orderInfo" },
    { text: "修图师", value: "picFixer" },
    { text: "审核人", value: "auditor" },
    { text: "摄影机构", value: "photographyStudio" },
    { text: "修图时间", value: "fixTime" },
    { text: "等待时间", value: "waitTime" },
    { text: "当前状态", value: "status" },
    { text: "操作", value: "operation" },
    { text: "", value: "data-table-expand" },
  ]
  private desserts: any = [
    {
      location: 1,
      picStandard: "大师",
      orderInfo: {
        orderNum: "T2021032562818481",
        waterNum: "C2021032569704458",
        photoProduct: "文艺照 - 单人",
        photoCount: 10,
      },
      picFixer: {
        fixer: "-",
        fixerLeader: "-",
      },
      auditor: "-",
      photographyStudio: "海马体",
      fixTime: "-",
      waitTime: "17355min",
      status: "待修图",
      operation: "-",
    },
    {
      location: 2,
      picStandard: "大师",
      orderInfo: {
        orderNum: "T2021021934563448",
        waterNum: "C2021032569704458",
        photoProduct: "文艺照 - 单人",
        photoCount: 20,
      },
      picFixer: {
        fixer: "-",
        fixerLeader: "-",
      },
      auditor: "-",
      photographyStudio: "海马体",
      fixTime: "-",
      waitTime: "17355min",
      status: "待修图",
      operation: "-",
    },
  ]
  private seachOrderArr: SearchOrderInterface[] = []

  /**
   * @description 搜索表格
   */
  async seachData () {
    if (!this.seachOrder) return this.$message.warning('请输入订单号')
    if (this.seachOrder.length !== 17) return this.$message.warning('请输入正确的订单号')
    if (!this.seachOrder.includes('T') && !this.seachOrder.includes('X')) return this.$message.warning('请输入正确的订单号')
    try {
      SettingModule.loading(true)
      const req = {
        outsideNo: this.seachOrder
      }
      const data = await await SearchOrderApi.searchOrderByOutsideNo(req)
      console.log(data)
      if (!data.length) this.$message.warning('暂无数据')
      this.desserts = data
      this.seachOrderArr = data
    } finally {
      SettingModule.loadingClose()
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  display: inline-block;
  width: 5em;
  margin: 0%;
  padding: 0%;
}
.s1 {
  letter-spacing: 0.345em;
}

.search-title {
  display: flex;
  justify-content: space-between;
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
  box-shadow: inset 0 4px 8px -5px rgba(50, 50, 50, 0.35),
    inset 0 -4px 8px -8px rgba(50, 50, 50, 0.35);
}

.v-timeline--dense .v-timeline-item__body {
  max-width: 330px;
  margin-right: auto;
}
</style>
