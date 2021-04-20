<template>
  <div>
    <transition name="main">
      <div id="ImgPreview" ref="ImgPreview" v-show="viewerVisibleShow">
        <!-- 预览窗的title-->
        <div class="titleBar" ref="titleBar">
          <div class="imgName">{{ imgName }}</div>
          <div>
            <v-icon large dark class="closeBtn" @click="visible()">
              mdi-close-circle-outline
            </v-icon>
          </div>
        </div>
        <!--左右按钮-->
        <div class="pre" ref="preCover">
          <v-icon large dark @click="prevImg">
            mdi-arrow-left-thin-circle-outline
          </v-icon>
        </div>

        <div class="next" ref="nextCover">
          <v-icon large dark @click="nextImg">
            mdi-arrow-right-thin-circle-outline
          </v-icon>
        </div>

        <!-- 预览的图片区域-->
        <div id="imgPreview">
          <!--加载动画-->
          <div class="loading" v-if="loading">
            <v-progress-circular
              indeterminate
              size="64"
            ></v-progress-circular>
          </div>
          <v-img
            contain
            min-height='700'
            max-height="900"
            class="img"
            ref="img"
            :src="imgSrc"
          ></v-img>
        </div>
        <!--预览窗的功能区-->
        <div class="toolBar" ref="toolBar">
          <div class="btnGroup">
            <div>
              <v-icon large dark @click="download(imgIndex)">
                mdi-download
              </v-icon>
            </div>
          </div>
        </div>
        <!--end-->
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
})
export default class ImgPreview extends Vue {
  @Prop() public viewerVisible!: boolean
  @Prop() public imgDataList!: any[]
  @Prop() public imgIndex!: number

  public imgSrc: string = '' // 预览图片的src
  public imgName: string = 'loading error' // 图片名
  public imgDataListLength!: number // 数组的长度
  public loading: boolean = false // 加载动画
  public error: boolean = false // 错误图片的加载状态
  public snapImgIndex!: number // 在调用Retry的临时数据
  public preloadImgData: any[] = [] // 预加载后图片的数据

  // 组件的可见性
  get viewerVisibleShow (): boolean {
    return this.viewerVisible
  }

  set viewerVisibleShow (value) {
    this.$emit('update:viewerVisible', value)
  }

  // imgElement的节点
  get imgElement (): any {
    return this.$refs.img
  }

  // img的索引
  get imgI (): number {
    return this.imgIndex
  }

  set imgI (value) {
    this.$emit('update:imgIndex', value)
  }

  // img的url数据
  get imgData (): any[] {
    return this.imgDataList
  }

  set imgData (value) {
    this.$emit('update:imgDataList', value)
  }

  // 预览窗viewer的显示
  public visible () {
    this.cleanData()
    this.viewerVisibleShow = false
  }

  // 清除数据
  public cleanData () {
    const arr = this.$data
    for (const key in arr) {
      if (arr.hasOwnProperty(key)) {
        if (typeof arr[key] !== 'object') {
          if (typeof arr[key] === 'string' && key !== 'imgName') {
            this.changeData(key, 'string', this)
          }
          if (key === 'imgName') {
            this.changeData(key, 'imgName', this)
          }
          if (typeof arr[key] === 'number') {
            this.changeData(key, 'number', this)
          }
        }
      }
    }
  }

  // 修改值
  public changeData (key: any, type: any, that: any) {
    if (type === 'string') {
      that[key] = ''
    }
    if (type === 'number') {
      that[key] = 0
    }
    if (type === 'imgName') {
      that[key] = 'loading error'
    }
  }

  //  上一张图
  public prevImg () {
    if (this.imgI === 0) {
      return
    } else {
      this.cleanData()
      this.changeLoading(true)
      setTimeout(() => {
        this.imgDataListLength = this.imgData.length
        this.imgI -= 1
        const indexNext: number = this.imgI
        this.init(indexNext - 1)
      }, 120)
    }
  }

  // 下一张图
  public nextImg () {
    let imgDataLength: number = this.imgData.length
    if (this.imgI === imgDataLength - 1) {
      return
    } else {
      this.cleanData()
      this.changeLoading(true)
      setTimeout(() => {
        this.imgDataListLength = this.imgData.length
        this.imgI += 1
        const indexNext: number = this.imgI
        this.init(indexNext + 1)
      }, 120)
    }
  }

  // 初始化
  public init (index: number) {
    this.changeLoading(true)
    this.setPreviewImg(index)
  }

  // 初始化img的信息
  public initImgMsg (index: number) {
    if (this.preloadImgData[index].error === true) {
      this.error = true
      // 处理图片加载错误，点击重试
      this.retry()
    } else {
      this.error = false
    }
    // 初始化图片的src和name
    this.imgSrc = this.preloadImgData[index].url
    this.imgName = this.preloadImgData[index].title
    // 初始化图片加载的错误状态
    this.snapImgIndex = index
  }

  // 下载图片
  public download (index: any) {
    window.location.href = `${this.imgData[index].url}?attname=`
  }

  // 改变loading状态
  public changeLoading (status: boolean) {
    this.loading = status
  }

  // 设置预览图片
  public setPreviewImg (index: number) {
    this.preloadImg(index).then((s) => {
      this.initImgMsg(index)
      this.changeLoading(false)
    }).catch((f) => {
      this.initImgMsg(index)
      this.changeLoading(false)
    })
  }

  // 预加载
  public preloadImg (index: number) {
    let imgData: any[] = this.imgData
    let snapData!: any
    let img = new Image()
    img.src = imgData[index].url
    return new Promise((resolve, reject) => {
      img.onload = () => {
        snapData = {
          title: imgData[index].title,
          url: imgData[index].url,
          id: imgData[index].id,
          width: img.width,
          height: img.height,
          error: false,
        }
        this.preloadImgData[index] = snapData
        resolve(true)
      }
      img.onerror = () => {
        snapData = {
          title: 'loading error',
          url: require('./img/error.png'),
          id: imgData[index].id,
          width: 128,
          height: 128,
          error: true,
        }
        this.preloadImgData[index] = snapData
        reject(false)
      }
    })
  }

  // 调用retry
  public handleRetry () {
    this.init(this.snapImgIndex)
  }

  // 加载重试
  public retry () {
    this.cleanData()
    this.imgElement.addEventListener('click', this.handleRetry)
  }
}
</script>

<style lang="less" scoped>
.main-enter,
.main-leave-to {
  opacity: 0;
}

.main-enter-active,
.main-leave-active {
  transition: all 0.4s ease;
}
</style>
