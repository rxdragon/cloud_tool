<template>
  <div class="order-card">
    <v-card :loading="orderInfo.loading" elevation="0">
      <v-card-title>{{ orderInfo.recordNo }}</v-card-title>
      <v-card-text>
        <v-row align="center" no-gutters class="mx-0">
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            看片订单状态：{{ orderInfo.stateCN }}
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            看片类型：{{ orderInfo.watchType === watchType.ONLINE ? '在线看片' : '门店看片' }}
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            是否转线下看片：{{ orderInfo.toOffline ? '是' : '否' }}
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            创建时间：{{ orderInfo.createAt }}
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            绑定时间：{{ orderInfo.bindAt }}
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            最后一次反馈时间：{{ orderInfo.recordLastAt }}
          </v-col>
          <v-col class="pa-0" v-if="orderInfo.deletedAt" cols="12" sm="6" md="4" lg="4" xl="4">
            删除时间：{{ orderInfo.deletedAt }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="subtitle-1 pb-0">门店信息：</v-card-title>
      <v-card-text>
        <v-row align="center" no-gutters class="mx-0">
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            门店id：{{ orderInfo.storeInfo.id }}
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            门店：{{ orderInfo.storeInfo.name }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="subtitle-1 pb-0">其他信息：</v-card-title>
      <v-card-text>
        <v-row align="center" no-gutters class="mx-0">
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            看片审核人：{{ orderInfo.checkerInfo.id }} - {{ orderInfo.checkerInfo.name }}
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            用户姓名：{{ orderInfo.userInfo.name }}
          </v-col>
          <v-col class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4">
            用户手机：{{ orderInfo.userInfo.phone }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="subtitle-1 pb-0">订单产品：</v-card-title>
      <v-card-text>
        <v-chip-group column>
          <v-chip v-for="(productItem, productKey) in orderInfo.productInfos" :key="productKey" small>
            {{ productItem }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PictureOnlineOrderInterface, WATCH_TYPE } from '@/model/PictureOnlineOrderModel'

@Component
export default class PictureSearch extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: PictureOnlineOrderInterface

  private watchType = WATCH_TYPE
  
}
</script>
