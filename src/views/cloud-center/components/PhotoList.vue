<template>
  <div class="photo-list">
    <div v-for="(photoItem, index) in orderInfo.photoStreams" :key="index" class="photo-box">
      <photo-box
        :order-info="orderInfo"
        :photo-item="photoItem"
        :index="index"
      ></photo-box>
    </div>
  </div>
</template>

<script lang="ts">
import { SettingModule } from '@/store/modules/setting'
import { Component, Vue, Prop } from 'vue-property-decorator'
import PhotoBox from './PhotoBox.vue'

@Component({
  components: { PhotoBox },
})
export default class PhotoList extends Vue {
  @Prop({ type: Object, required: true }) orderInfo!: any

  get imgCompressDomain () {
    return SettingModule.compressDomain
  }
  downloadImg (val: { origin_photo_path: any }) {
    window.location.href = `${this.imgCompressDomain}${val.origin_photo_path}?attname=`
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/variables.less';
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
