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
          category-show-all
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
          <v-card color="grey lighten-4" min-width="350px" flat>
            <!-- 标题 -->
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
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

  mounted () {
    this.getOneDayInfo()
  }

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

  updateRange ({ start, end }: any) {
    console.log(1)
    const events = []

    const min = new Date(`${start.date}T00:00:00`)
    const max = new Date(`${end.date}T23:59:59`)
    const days = (max.getTime() - min.getTime()) / 86400000
    const eventCount = this.rnd(days, days + 20)


    for (let i = 0; i < eventCount; i++) {
      const allDay = this.rnd(0, 3) === 0
      const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      const first = new Date(firstTimestamp - (firstTimestamp % 900000))

      const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
      const second = new Date(first.getTime() + secondTimestamp)

      events.push({
        name: '测试', // 任务名称
        start: first, // 开始时间
        end: second, // 结束时间
        color: 'cyan', // 颜色
        details: '1', // 详情
        timed: false,
      })
    }

    console.log(events)

    this.events = events
  }

  rnd (a: number, b: number) {
    return Math.floor((b - a + 1) * Math.random()) + a
  }

  async getOneDayInfo () {
    const nowDate = new Date()
    const req = {
      startAt: joinTimeSpan(nowDate),
      endAt: joinTimeSpan(nowDate, 1)
    }
    await CloudApi.getWholeQuota(req)
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
