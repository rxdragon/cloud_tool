<template>
  <div class="photo-detail">
    <v-row>
      <v-col>
        <v-card>
          <div class="table-panel panel-order">
            <div class="content-title">流水号</div>
            <div class="content-title">所属机构</div>
            <div class="content-title">拍摄产品</div>
            <div class="content-title">摄影师</div>
            <div class="content-title">门店</div>
            <div class="content-title">照片数量</div>
          </div>
          <div class="table-panel panel-order">
            <div class="panel-content">{{ orderInfo.orderInfos.streamNum }}</div>
            <div class="panel-content">{{ orderInfo.photographerOrgNames }}</div>
            <div class="panel-content">{{ orderInfo.orderInfos.producName }}</div>
            <div class="panel-content">{{ orderInfo.photographers }}</div>
            <div class="panel-content">{{ orderInfo.storeNames }}</div>
            <div class="panel-content">{{ orderInfo.orderInfos.photoCount }}</div>
          </div>
          <div class="table-panel panel-grade">
            <div class="content-title">修图标准</div>
            <div class="content-title">当前状态</div>
            <div v-if="orderInfo.retouchers.retoucher" class="content-title">修图师</div>
            <div v-if="orderInfo.reviewers" class="content-title">审核人</div>
          </div>
          <div class="table-panel panel-grade">
            <div class="panel-content">
              <div class="standard-box">
                {{ orderInfo.retouchStandards }}
                <div class="standard-icon">
                  <div v-if="orderInfo.retouchStandards == '缦图'" class="retouch-standard-manto"></div>
                  <div v-if="orderInfo.retouchStandards == '蓝标'" class="retouch-standard-blue"></div>
                  <div v-if="orderInfo.retouchStandards == '大师'" class="retouch-standard-master"></div>
                </div>
              </div>
            </div>
            <div class="panel-content">{{ orderInfo.states }}</div>
            <div v-if="orderInfo.retouchers.retoucher" class="panel-content">{{ orderInfo.retouchers.retoucher }}</div>
            <div v-if="orderInfo.reviewers" class="panel-content">{{ orderInfo.reviewers }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
})
export default class PhotoDetail extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: any
}
</script>

<style lang="less" scoped>
.table-panel {
  display: grid;
  justify-items: center;
}

.panel-order {
  grid-template-columns: repeat(6, 1fr);
}

.panel-order-retoucher {
  grid-template-columns: repeat(6, 1fr);
}

.panel-grade {
  display: flex;
}

.content-title {
  width: 100%;
  padding: 17px 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: #303133;
  text-align: center;
  background-color: #fafafa;
}

.panel-content {
  width: 100%;
  padding: 21px 3px;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  color: #606266;
  text-align: center;
  word-break: break-word;
  border-bottom: 1px solid #f2f6fc;
}

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
