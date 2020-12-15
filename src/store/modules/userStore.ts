import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import * as UserApi from '@/api/userApi'
import * as SessionTool from '@/utils/sessionTool'
import router from '@/router/index'

export interface IUserStoreState {
  xStreamID: string,
  id: string | number,
  name: string,
  nickname: string,
  avatarImg: string,
}

@Module({ dynamic: true, store, name: 'userStore' })
class UserStore extends VuexModule implements IUserStoreState {
  public xStreamID: string = ''
  public id: string | number = ''
  public name: string = ''
  public nickname: string = ''
  public avatarImg: string = ''

  @Mutation
  private SET_XStreamID (data: string) {
    this.xStreamID = data
  }

  @Action
  public saveStreamID (data: string) {
    this.SET_XStreamID(data)
  }

  /**
   * @description 通过token登录换取token
   * @param token 
   */
  @Action
  public login (token: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const xStreamID: string = await UserApi.login({ token })
        this.SET_XStreamID(xStreamID)
        SessionTool.setXStreamId(xStreamID)
        await UserApi.userExpire()
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  @Mutation
  private CLEAR_USER_INFO () {
    this.xStreamID = ''
    this.id = ''
    this.name = ''
    this.nickname = ''
    this.avatarImg = ''
  }

  /**
   * @description 登出账号
   */
  @Action
  public loginOut () {
    return new Promise(async (resolve, reject) => {
      try {
        UserApi.logout()
        this.CLEAR_USER_INFO()
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  @Mutation
  private SET_USERINFO (info: any) {
    this.id = info.id
    this.name = info.name
    this.nickname = info.nickname
    this.avatarImg = info.avatar
  }

  /**
   * @description 获取用户信息
   */
  @Action
  public getUserInfo () {
    return new Promise(async (resolve, reject) => {
      try {
        const saveInfo = SessionTool.getUserInfo()
        const info = saveInfo || await UserApi.info()
        const xStreamID: string = SessionTool.getXStreamId() as string
        this.SET_XStreamID(xStreamID)
        SessionTool.setUserInfo(info)
        this.SET_USERINFO(info)
        resolve(info)
      } catch (error) {
        router.push(`/401`)
        reject(error)
      }
    })
  }
}

export const UserStoreModule = getModule(UserStore)
