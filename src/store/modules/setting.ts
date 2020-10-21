import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface ISettingState {
  drawer: boolean,
  pageLoading: boolean
}

@Module({ dynamic: true, store, name: 'setting' })
class Setting extends VuexModule implements ISettingState {
  public drawer = true
  public pageLoading = false

  @Mutation
  private SET_DRAWER (data: boolean) {
    this.drawer = data
  }

  @Mutation
  private SET_PAGE_LOADING (data: boolean) {
    this.pageLoading = data
  }

  @Action
  public setDrawer (data: boolean) {
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
