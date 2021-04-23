<template>
  <div>
    <transition name="main">
      <div id="ImgPreview" ref="ImgPreview" v-show="viewerVisibleShow">
        <!-- 预览的图片区域-->
        <v-window class="v-window" show-arrows dark :value="showVerisonIndex">
          <v-window-item class="v-window-item" v-for="(item, i) in imgDataList" :key="i">
            <v-sheet height="100%">
              <v-row class="v-row" align="center" justify="center">
                <div class="img-display">
                  <!--加载动画-->
                  <div v-if="loading">
                    <v-progress-circular indeterminate size="64"></v-progress-circular>
                  </div>
                  {{ item.title }}
                  <v-img contain @click="visible" max-height="900px" class="img" ref="img" :src="item.url"></v-img>
                  <div class="download-img">
                    <v-icon large color="blue darken-2" @click="download(imgSrc)">
                      mdi-download
                    </v-icon>
                  </div>
                </div>
              </v-row>
            </v-sheet>
          </v-window-item>
        </v-window>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class ImgPreview extends Vue {
  @Prop() public viewerVisible!: boolean
  @Prop() public imgDataList!: any[]
  @Prop() public imgIndex!: number

  public imgSrc: string = '' // 预览图片的src
  public imgName: string = 'loading error' // 图片名
  public loading: boolean = false // 加载动画
  public error: boolean = false // 错误图片的加载状态

  // 组件的可见性
  get viewerVisibleShow (): boolean {
    return this.viewerVisible
  }

  // img的索引
  get showVerisonIndex (): number {
    return this.imgIndex
  }

  // img的url数据
  get imgData (): any[] {
    return this.imgDataList
  }

  // 预览窗viewer的显示
  public visible () {
    this.$emit('update:viewerVisible', false)
  }

  // 下载图片
  public download (src: any) {
    window.location.href = `${src}?attname=`
  }
}
</script>

<style lang="less" scoped>
#ImgPreview {
  position: fixed;
  z-index: 2015;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgb(0, 0, 0, 0.55);
}

.v-window {
  height: 100%;
}

.v-window .prev-img{
  display: none;
}

.v-window:hover .prev-img{
  display: block;
  z-index: 2030;
  position: absolute;
  padding-left: 10px;
  left: 0;
  top: 50%;
}

.v-window .next-img{
  display: none;
}

.v-window:hover .next-img{
  display: block;
  z-index: 2030;
  position: absolute;
  padding-right: 10px;
  right: 0;
  top: 50%;
}

.v-window-item {
  height: 100%;
}

.v-row {
  height: 100%;
}

.img-version {
  text-align: center;
  font-weight: 400;
  font-size: 17px;
}

.img-display {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  text-align: center;
  font-size: 17px;
  font-weight: 400;
}

.download-img {
  z-index: 2019;
  padding-top: 10px;
  display: block;
}

.main-enter,
.main-leave-to {
  opacity: 0;
}

.main-enter-active,
.main-leave-active {
  transition: all 0.4s ease;
}
</style>
