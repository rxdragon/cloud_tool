<template>
  <div class="photo-detail">
    <v-row>
      <v-col>
        <v-card elevation="0">
          <div class="detail-table">
            <div class="table-panel">
              <div class="content-title">流水号</div>
              <div class="content-title">所属机构</div>
              <div class="content-title">拍摄产品</div>
              <div class="content-title">摄影师</div>
              <div class="content-title">门店</div>
              <div class="content-title">照片数量</div>
            </div>
            <div class="table-panel">
              <div data-label="流水号" class="panel-content">{{ orderInfo.orderInfos.streamNum }}</div>
              <div data-label="所属机构" class="panel-content">{{ orderInfo.photographerOrgNames }}</div>
              <div data-label="拍摄产品" class="panel-content">{{ orderInfo.orderInfos.producName }}</div>
              <div data-label="摄影师" class="panel-content">{{ orderInfo.photographers }}</div>
              <div data-label="门店" class="panel-content">{{ orderInfo.storeNames }}</div>
              <div data-label="照片数量" class="panel-content">{{ orderInfo.orderInfos.photoCount }}</div>
            </div>
            <div class="table-panel">
              <div class="content-title">修图标准</div>
              <div class="content-title">当前状态</div>
              <div class="content-title" v-if="orderInfo.retouchers.retoucher">修图师</div>
              <div class="content-title" v-if="orderInfo.reviewers">审核人</div>
            </div>
            <div class="table-panel">
              <div data-label="修图标准" class="panel-content">
                <div class="standard-box">
                  {{ orderInfo.retouchStandards }}
                  <div class="standard-icon">
                    <div v-if="orderInfo.retouchStandards == '缦图'" class="retouch-standard-manto"></div>
                    <div v-if="orderInfo.retouchStandards == '蓝标'" class="retouch-standard-blue"></div>
                    <div v-if="orderInfo.retouchStandards == '大师'" class="retouch-standard-master"></div>
                  </div>
                </div>
              </div>
              <div data-label="当前状态" class="panel-content">{{ orderInfo.states }}</div>
              <div data-label="修图师" class="panel-content" v-if="orderInfo.retouchers.retoucher">{{ orderInfo.retouchers.retoucher }}</div>
              <div data-label="审核人" class="panel-content" v-if="orderInfo.reviewers">{{ orderInfo.reviewers }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class PhotoDetail extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: any
}
</script>

<style lang="less" scoped>
.table-panel {
  display: flex;
}

.content-title {
  display: inline-block;
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
  display: inline-block;
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

@media screen and (max-width: 500px) {
  .detail-table {
    display: inline;
  }

  .table-panel {
    display: block;
  }

  .table-panel .content-title {
    display: none;
  }

  .table-panel .panel-content {
    display: block;
    text-align: right;
    white-space: nowrap;
    font-size: 13px;
    border-top: 1px dotted #ccc;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
  }

  .table-panel .panel-content:first-child {
    border-bottom: 0;
  }

  .table-panel .panel-content:before {
    content: attr(data-label);
    float: left;
    text-transform: uppercase;
    font-weight: bold;
  }
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
