import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

import { NOTIFY_STATUS } from '@/utils/Enumerate'

export interface ISettingState {
  drawer: null | boolean,
  pageLoading: boolean,
  notificationStatus: NOTIFY_STATUS
}

@Module({ dynamic: true, store, name: 'setting' })
class Setting extends VuexModule implements ISettingState {
  public drawer: null | boolean = null
  public pageLoading = false
  public notificationStatus = NOTIFY_STATUS.DEFAULT
  public compressDomain: string = process.env.VUE_APP_COMPRESS_DOMAIN

  @Mutation
  private SET_DRAWER (data: null | boolean) {
    this.drawer = data
  }

  @Mutation
  private SET_PAGE_LOADING (data: boolean) {
    this.pageLoading = data
  }

  @Mutation
  public SET_NOTIFY_STATUS (data: NOTIFY_STATUS) {
    this.notificationStatus = data
  }

  @Action
  public setDrawer (data: null | boolean) {
    this.SET_DRAWER(data)
  }

  @Action
  public loading (data: boolean) {
    this.SET_PAGE_LOADING(data)
  }

  @Action
  public loadingClose () {
    setTimeout(() => {
      this.SET_PAGE_LOADING(false)
    }, 300)
  }
}

export const SettingModule = getModule(Setting)
