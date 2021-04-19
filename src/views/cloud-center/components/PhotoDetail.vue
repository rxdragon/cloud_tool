<template>
  <div class="photo-detail">
    <v-row>
      <v-col>
        <v-card>
          <v-data-table :headers="headers1" :items="[orderInfo]" hide-default-footer disable-pagination disable-sort>
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
          <v-data-table :headers="headers2" :items="[orderInfo]" hide-default-footer disable-pagination disable-sort>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PhotoDetail extends Vue {
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

  @Prop({ type: Object, required: true }) orderInfo!: any
}
</script>

<style lang="less" scoped>
.standard-icon {
  display: inline-block;
  width: 16px;
  height: 17px;
  margin-left: 5px;
  vertical-align: text-top;
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
