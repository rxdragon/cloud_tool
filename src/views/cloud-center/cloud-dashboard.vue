<template>
  <div class="cloud-dashboard">
    <v-col class="calendar-main pa-0">
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            今日
          </v-btn>
          <!-- 上一月 -->
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <!-- 下一月 -->
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>

          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>

      <v-sheet height="calc(100% - 64px)">
        <!-- 日历 -->
        <v-calendar
          ref="calendar"
          color="primary"
          type="month"
          v-model="focus"
          :events="events"
          :event-color="getEventColor"
          @click:event="showEvent"
          @change="updateRange"
        />

        <!-- 日历简略详情 -->
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="200px" flat>
            <!-- 标题 -->
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title>
                {{ selectedEvent.type === 'uploadPhoto' ? '摄影上传张数' : '修图张数' }} {{ selectedEvent.name }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn> -->
            </v-toolbar>

            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>

            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false" >
                关闭
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { joinTimeSpan } from '@/utils/timeUtil'
import * as CloudApi from '@/api/cloudApi'

@Component
export default class CloudDashboard extends Vue {
  private focus: string = '' // 当前激活日期
  private selectedEvent: any = {}
  private selectedElement: any = null
  private selectedOpen: boolean = false // 是否显示弹出框
  private events: any[] = [] // 日期内数据

  getEventColor (event: any) {
    return event.color
  }

  setToday () {
    this.focus = ''
  }

  prev () {
    (this.$refs.calendar as any).prev()
  }

  next () {
    (this.$refs.calendar as any).next()
  }

  showEvent ({ nativeEvent, event }: any) {
    const open = () => {
      this.selectedEvent = event
      this.selectedElement = nativeEvent.target
      setTimeout(() => {
        this.selectedOpen = true
      }, 10)
    }

    if (this.selectedOpen) {
      this.selectedOpen = false
      setTimeout(open, 10)
    } else {
      open()
    }

    nativeEvent.stopPropagation()
  }

  async updateRange ({ start, end }: any) {
    const checkDate = new Date(end.date)
    const year = checkDate.getFullYear()
    const nowMonth = checkDate.getMonth() + 1
    const nowDay = checkDate.getDate()

    const photoEvent = []
    const retouchEvent = []
    for (let index = 1; index <= nowDay; index++) {
      const createDate = new Date(`${year}/${nowMonth}/${index}`)
      const createData = {
        start: createDate,
        end: new Date(`${year}/${nowMonth}/${index} 23:59:59`),
        name: '...',
        details: '...',
        year,
        month: nowMonth,
        day: index,
        color: 'indigo',
        type: 'uploadPhoto'
      }
      const retouchCreateData = JSON.parse(JSON.stringify(createData))
      retouchCreateData.start = createDate
      retouchCreateData.end = createDate
      retouchCreateData.color = 'green accent-4'
      retouchCreateData.type = 'retouchPhoto'
      photoEvent.push(createData)
      retouchEvent.push(retouchCreateData)
    }

    this.events = [...photoEvent, ...retouchEvent]

    for (const item of this.events) {
      const res: any = await this.getOneDayInfo(item.start)
      const allUploadPhoto = Number(res.photographyUploadPhotoNum.single) + Number(res.photographyUploadPhotoNum.multi)
      const allRetouchPhoto = Number(res.allRetouchPhoto.single) + Number(res.allRetouchPhoto.multi)

      if (item.type === 'uploadPhoto') {
        item.name = String(allUploadPhoto)
        item.details = `
          <p>摄影单人：${res.photographyUploadPhotoNum.single}</p>
          <p>摄影多人：${res.photographyUploadPhotoNum.multi}</p>
          <p>修图单人：${res.allRetouchPhoto.single}</p>
          <p>修图多人：${res.allRetouchPhoto.multi}</p>
          <p>摄影上传单量：${res.photographOrgUploadStreamNum}</p>
        `
      } else {
        item.name = String(allRetouchPhoto)
        item.details = `
          <p>摄影单人：${res.photographyUploadPhotoNum.single}</p>
          <p>摄影多人：${res.photographyUploadPhotoNum.multi}</p>
          <p>修图单人：${res.allRetouchPhoto.single}</p>
          <p>修图多人：${res.allRetouchPhoto.multi}</p>
          <p>摄影上传单量：${res.photographOrgUploadStreamNum}</p>
        `
      }
    }

  }

  /**
   * @description 获取单日订单信息
   */
  async getOneDayInfo (checkDate: Date) {
    const req = {
      startAt: joinTimeSpan(checkDate).replace(/\//g, '-'),
      endAt: joinTimeSpan(checkDate, 1).replace(/\//g, '-')
    }
    const res = await CloudApi.getWholeQuota(req)
    return res
  }
}
</script>

<style lang="less" scoped>
.cloud-dashboard {
  height: calc(100% + 12px);
  width: calc(100% + 24px);
  margin: -12px 0 0 -12px;
}

.calendar-main {
  height: 100%;
}
</style>
