<template>
  <div class="add-online-watchers">
    <v-alert type="warning" border="bottom" colored-border elevation="2" class="text-subtitle-2 warning--text" dense v-if="!isLogin">该功能需要云端权限，请先登录哦～</v-alert>
    <v-row class="search-box" align="end" no-gutters>
      <v-col cols="12">
        <!-- <v-text-field
          hideDetails
          clearable
          v-model.trim="staffidString"
          @keyup.native.enter="analysisStaffInfo"
        /> -->
        <v-textarea
          outlined
          name="input-7-4"
          label="伙伴id：例 666666,666667"
          v-model.trim="staffidString"
        ></v-textarea>
      </v-col>
      <v-col cols="12" class="button-box">
        <v-btn class="search-box" color="primary" @click="analysisStaffInfo">解析</v-btn>
      </v-col>
      
      <v-col cols="12" class="button-box my-12">
        <v-chip-group active-class="primary--text">
          <v-chip
            v-for="(staffId, staffIdIndex) in staffidArr" :key="staffIdIndex"
            @click:close="deleteStaffIdTag(staffIdIndex)"
            text-color="white"
            color="cyan"
            label
            close
          >
            {{ staffId }}
          </v-chip>
        </v-chip-group>
      </v-col>

      <v-col v-if="staffidArr.length" cols="12" class="button-box">
        <v-btn
          class="search-box white--text"
          color="pink"
          @click="addOnlineWathcer"
        >
          添加在线看片师
        </v-btn>
      </v-col>
    </v-row>

    <!-- 添加在线看片师确定按钮 -->
    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-title class="headline">确认添加在线看片师么？</v-card-title>
        <v-card-text> 这将添加在线看片师到线上，添加成功不可撤回，确认添加么？</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink" text @click="submitOnlineWatcher">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserStoreModule } from '@/store/modules/userStore'
import * as PictureOnlineApi from '@/api/pictureOnlineApi'

@Component
export default class AddOnlineWatchers extends Vue {
  private staffidString: String = ''
  private staffidArr: string[] = []
  private dialog: boolean = false
  private isLogin: boolean = false

  created () {
    this.isLogin = Boolean(UserStoreModule.xStreamID)
  }

  /**
   * @description 解析信息
   */
  analysisStaffInfo () {
    if (!this.staffidString) return this.$message.warning('请输入伙伴id')
    this.staffidArr = this.staffidString.split(',')
  }

  /**
   * @description 删除标签
   */
  deleteStaffIdTag (index: number) {
    this.staffidArr.splice(index, 1)
  }

  /**
   * @description 初步确认添加在线看片师
   */
  async addOnlineWathcer () {
    const xStreamId = UserStoreModule.xStreamID
    if (!xStreamId) {
      this.$message.warning('请先登录')
      await this.$delayLoading()
      this.$router.push('/login')
      return
    }
    this.dialog = true
  }

  /**
   * @description 添加在线看片师
   */
  async submitOnlineWatcher () {
    const xStreamId = UserStoreModule.xStreamID
    console.log(xStreamId)
    const req = {
      staffIds: this.staffidArr,
      xid: xStreamId
    }
    await PictureOnlineApi.addOnlineWatchers(req)
    this.$message.success('添加成功')
    this.staffidString = ''
    this.staffidArr = []
  }
}
</script>

<style lang="less" scoped>
.search-box {
  width: 100%;
}
</style>
