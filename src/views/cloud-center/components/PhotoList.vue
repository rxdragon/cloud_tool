<template>
  <div class="photo-list">
    <div v-for="(photoItem, index) in orderInfo.photoStreams" :key="index" class="photo-box">
      <PhotoBox
        :order-info="orderInfo"
        :photo-item="photoItem"
        :index="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PhotoBox from './PhotoBox.vue'

@Component({
  components: { PhotoBox },
})
export default class PhotoList extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: any
}
</script>

<style lang="less" scoped>
.show-info {
  display: flex;
  justify-content: space-between;
  padding: 12px 6px 6px;
  font-family: @pingFang;
  font-size: 14px;
  line-height: 22px;
  color: #606266;
  border-top: 1px solid @borderColor;

  .icon-box {
    display: flex;
    align-items: center;
    cursor: pointer;

    .iconfont {
      margin-right: 9px;
    }
  }

  .only-show {
    cursor: initial !important;
  }

  .good:hover {
    color: #ff8f00;
  }

  .good-photo {
    color: #ff8f00;
  }

  .bad:hover {
    color: #909399;
  }

  .bad-photo {
    color: #909399;
  }
}
</style>
