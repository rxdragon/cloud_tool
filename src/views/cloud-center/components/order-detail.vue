<template>
  <div class="order-detail">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!loading && orderInfo">
      <!-- 照片信息显示区域 -->
      <v-row>
        <v-col>
          <v-card>
            <v-data-table
              :headers="headers1"
              :items="[orderInfo]"
              hide-default-footer
              disable-pagination
              disable-sort
            >
              <template v-slot:[`item.streamNun`]="{ item }">
                <div>
                  {{ item.orderInfos.streamNum }}
                </div>
              </template>
              <template v-slot:[`item.orgName`]="{ item }">
                <div>
                  {{ item.photographerOrgNames }}
                </div>
              </template>
              <template v-slot:[`item.orderInfo`]="{ item }">
                <div>
                  {{ item.orderInfos.producName }}
                </div>
              </template>
              <template v-slot:[`item.photographer`]="{ item }">
                <div>
                  {{ item.photographers }}
                </div>
              </template>
              <template v-slot:[`item.storeName`]="{ item }">
                <div>
                  {{ item.storeNames }}
                </div>
              </template>
              <template v-slot:[`item.photoNum`]="{ item }">
                <div>
                  {{ item.orderInfos.photoCount }}
                </div>
              </template>
            </v-data-table>
            <v-divider></v-divider>
            <v-data-table
              v-if="!loading"
              :headers="headers2"
              :items="[orderInfo]"
              hide-default-footer
              disable-pagination
              disable-sort
            >
              <template v-slot:[`item.retouchStandard`]="{ item }">
                <div>
                  {{ item.retouchStandards }}
                  <div class="standard-icon">
                    <div v-if="item.retouchStandards == '缦图'" class="retouch-standard-manto"></div>
                    <div v-if="item.retouchStandards == '蓝标'" class="retouch-standard-blue"></div>
                    <div v-if="item.retouchStandards == '大师'" class="retouch-standard-master"></div>
                  </div>
                </div>
              </template>
              <template v-slot:[`item.state`]="{ item }">
                <div>
                  {{ item.states }}
                </div>
              </template>
              <template v-slot:[`item.retoucher`]="{ item }">
                <div>
                  {{ item.retouchers.retoucher }}
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
      <!-- 修图要求 -->
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-chip class="ma-2" color="#edf0ff" label text-color="#4669FB">
                {{ '眼睛增大幅度：' + orderInfo.retouchClaims.eye }}
              </v-chip>
              <v-chip class="ma-2" color="#edf0ff" label text-color="#4669FB">
                {{ '瘦脸幅度：' + orderInfo.retouchClaims.face }}
              </v-chip>
              <!-- TODO 缺少祛痣 -->
              <v-divider></v-divider>
              <!-- TODO 更class名字 -->
              <div class="ordernote">
                <span class="inline-subtitle">
                  修图备注：
                </span>
                <span class="ordernote-content">{{ orderInfo.orderNotes }}</span>
              </div>
              <v-divider></v-divider>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 照片流 -->
      <!-- TODO 预览 photobox组件 -->
      <v-row v-for="(val, index) in orderInfo.photoStreams" :key="index">
        <v-col>
          <v-card>
            <div class="abovePhoto">
              <span>｜</span>
              {{ '照片  ' + (index + 1) }}
              <span class="iseffects">{{ val.special_efficacy }}</span>
            </div>
            <div class="photobox">
              <v-avatar class="photo" tile size="243" height="253">
                <v-img
                  contain
                  :src="`${imgCompressDomain}${val.origin_photo_path}`"
                  :lazy-src="`${imgCompressDomain}${val.origin_photo_path}`"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
              <div class="beneathPhoto">
                <v-btn text class="downloadImg" @click="downloadImg(val)">下载照片</v-btn>
                <span class="originImg">原片</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import * as SearchOrderApi from '@/api/searchOrderApi'
import { Component, Vue } from 'vue-property-decorator'
import { SettingModule } from '@/store/modules/setting'

@Component
export default class OrderDetail extends Vue {
  private loading: boolean = false
  private orderInfo: any = null
  private headers1: object[] = [
    { text: '流水号', value: 'streamNun', width: 170 },
    { text: '所属机构', value: 'orgName', width: 170 },
    { text: '拍摄产品', value: 'orderInfo', width: 170 },
    { text: '摄影师', value: 'photographer', width: 170 },
    { text: '门店', value: 'storeName', width: 170 },
    { text: '照片数量', value: 'photoNum', width: 170 },
  ]
  private headers2: object[] = [
    { text: '修图标准', value: 'retouchStandard', width: 340 },
    { text: '当前状态', value: 'state', width: 340 },
    { text: '修图师', value: 'retoucher', width: 340 },
  ]

  /**
   * @description 获取详情信息
   */
  async created () {
    try {
      this.loading = true
      if (this.$route.query.seachStream) {
        // TODO 报错后，返回之前页面
      }
      const req: any = {
        streamNum: this.$route.query.seachStream
      }
      // TODO 更改接口
      const data = await SearchOrderApi.searchOrderDetailByStream(req)
      console.log(data)
      if (!data) return this.$message.warning('暂无数据')
      // todo 延迟一定时间后返回 前面页面
      this.orderInfo = data
    } finally {
      this.loading = false
    }
  }

  get imgCompressDomain () {
    return SettingModule.compressDomain
  }
  
  downloadImg (val: { origin_photo_path: any }) {
    window.location.href = `${this.imgCompressDomain}${val.origin_photo_path}?attname=`
  }

}
</script>

<style lang="less" scoped>
.label {
  display: inline-block;
  width: 127px;
}

.standard-icon {
  display: inline-block;
  width: 16px;
  height: 17px;
  margin-left: 5px;
  vertical-align: text-top;
}

.photobox {
  display: inline-block;
  width: 253px;
  margin: 0 15px 15px 15px;
  padding: 5px;
  background-color: #f5f7fa;
}

.abovePhoto {
  display: flex;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 10px 10px;
}

.iseffects {
  display: flex;
  color: #ff3974;
  font-weight: 400;
  margin-left: auto;
  justify-content: end;
}

.beneathPhoto {
  display: flex;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
}

.originImg {
  display: flex;
  padding: 9.5px 6px 0 0;
  margin-left: auto;
  justify-content: end;
}

/deep/ .v-btn:not(.v-btn--round).v-size--default {
  padding: 0 0;
}

.downloadImg {
  color: #4669fb;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
}

.ordernote {
  display: flex;
  padding: 12px 10px;
}

.inline-subtitle {
  width: 90px;
}

.ordernote-content {
  width: 100%;
}

.retouch-standard-manto {
  height: 100%;
  overflow: hidden;
  background-image: url(../../../assets/sprites.png);
  background-position: -319px -76px;
  background-size: 660px 260px;
}

.retouch-standard-blue {
  height: 100%;
  overflow: hidden;
  background-image: url(../../../assets/sprites.png);
  background-position: -296px -76px;
  background-size: 660px 260px;
}

.retouch-standard-master {
  height: 100%;
  overflow: hidden;
  background-image: url(../../../assets/sprites.png);
  background-position: -273px -76px;
  background-size: 660px 260px;
}
</style>
