import Vue from 'vue'
import { SettingModule } from '@/store/modules/setting'

import * as uuid from 'uuid'

import { NOTIFY_STATUS } from '@/utils/Enumerate'

/**
 * @description 获取权限
 */
async function getPermission () {
  if (!('Notification' in window)) {
    if (!Vue.prototype.$isIphone) {
      Vue.prototype.$message.warning('请使用Chrome浏览器或升级Chrome浏览器')
    }
    return false
  }
  const status: any = await Notification.requestPermission()
  SettingModule.SET_NOTIFY_STATUS(status)
  return status === NOTIFY_STATUS.GRANTED
}


// 初始化权限
export default async function initNotification () {
  console.log(Vue.prototype.$isIphone, '1')
  const permission = await getPermission()
  if (!permission) {
    Vue.prototype.$notification = () => {
      Vue.prototype.$message.warning('请开启通知权限')
    }
  } else {

    type callback = {
      title: string,
      body: string,
      icon: string,
      clickCB: any
    }
    Vue.prototype.$notification = ({ title, body, icon, clickCB }: callback) => {
      const options = {
        body,
        tag: uuid.v4(),
        icon,
        requireInteraction: true // 表示通知应保持有效，直到用户点击或关闭它，而不是自动关闭。默认值为false。 
      }
      const notification = new Notification(title, options)

      notification.onclick = clickCB ?
        clickCB :
        (event: any) => {
          window.focus()
          event.target.close()
        }

      notification.onshow = (event: any) => {
        console.warn(`${event.target.title}`, 'onshow')
      }
      notification.onerror = (event: any) => {
        console.log(`${event.target.title}`, 'onerror')
      }
      notification.onclose = (event: any) => {
        console.error(`${event.target.title}`, 'onclose')
      }
      return notification
    }
  }
}
