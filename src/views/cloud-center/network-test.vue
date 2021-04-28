<template>
  <div class="network-test">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- 搜索区域 -->
    <v-row class="search-box mb-4" align="end" no-gutters>
      <v-col cols="9" sm="6" md="4" lg="4" xl="4">
        <v-text-field
          label="伙伴id"
          hideDetails
          clearable
          v-model.trim="staffID"
          @keyup.native.enter="sendWs"
        />
      </v-col>
      <v-col
        class="button-box pl-6"
        cols="3" sm="4" md="4" lg="4" xl="4"
      >
        <v-btn class="search-box" color="primary" @click="sendWs">查询</v-btn>
      </v-col>
    </v-row>

    <v-card v-if="networkMessage" elevation="2" class="netmessage-content">
      {{ networkMessage }}
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as CloudApi from '@/api/cloudApi'

@Component
export default class NetworkTest extends Vue {
  private staffID: string = ''
  private loading: boolean = false
  private networkMessage: string = ''
  private getCount: number = 0

  /**
   * @description 发送ws信息
   */
  async sendWs () {
    if (!this.staffID) return this.$message.warning('请输入伙伴id')
    if (Number(this.staffID) < 600000) return this.$message.warning('请输入正确伙伴id')
    const req = {
      staffId: this.staffID
    }
    this.networkMessage = ''
    try {
      this.loading = true
      await CloudApi.sendStaffWs(req)
      this.getStaffNetworkInfo()
    } catch (error) {
      this.$message.warning(error)
    }
  }

  async getStaffNetworkInfo () {
    const req = {
      staffId: this.staffID
    }
    const res: any = await CloudApi.getStaffNetworkInfo(req)
    if (!res) {
      if (this.getCount > 5) {
        this.loading = false
        this.getCount = 0
        this.$message.warning('请求超市')
        return
      } else {
        setTimeout(() => {
          this.getStaffNetworkInfo()
          this.getCount++
        }, 2000)
        return
      }
    } else {
      const { message } = res.message
      this.networkMessage = message
      this.loading = false
      this.getCount = 0
    }
  }
}
</script>

<style lang="less" scoped>
.netmessage-content {
  white-space: pre-line;
  padding: 20px;
  font-size: 14px;
}
</style>
