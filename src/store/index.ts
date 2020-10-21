import Vue from 'vue'
import Vuex from 'vuex'
import { ISettingState } from './modules/setting'
import { IPermissionState } from './modules/permission'

Vue.use(Vuex)

export interface IRootState {
  setting: ISettingState,
  permission: IPermissionState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
