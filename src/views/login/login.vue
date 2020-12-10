<template>
  <div class="login">
    <div v-if="$isMobile" class="mobile-login d-flex justify-center align-center">
      <v-btn class="test-btn blue--text text--lighten-5" color="blue" @click="login">登录</v-btn>
    </div>
    <div v-else class="pc-login">
      <iframe ref="login" title="login index" class="login_iframe" :src="ssoUrl" />
      <div id="loading-login">
      <div class="loading-main">
        <div class="square">
          <span></span>
          <span></span>
          <span></span>
          <div class="content">
            <svg width="128" height="128" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 669 406">
              <defs>
                <filter id="c" x="-9.2%" y="-10.7%" width="118.4%" height="130.3%" name="c">
                  <feOffset result="shadowOffsetOuter1" dy="18" in="SourceAlpha"/>
                  <feGaussianBlur result="shadowBlurOuter1" stdDeviation="17.5" in="shadowOffsetOuter1"/>
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.64 0" in="shadowBlurOuter1"/>
                </filter>
              </defs>
              <g style="filter:url(#c)">
                <path id="b" d="M662.12,369c1.58.76,3.15,1.56,4.67,2.4a93.76,93.76,0,0,1,43.14,50.79c4.07-.38,8.19-.61,12.36-.61A130.94,130.94,0,0,1,853,552.78C853,625.25,794.49,684,722.29,684H295.9C234.1,684,184,633.71,184,571.67A112.24,112.24,0,0,1,227.21,483L367.78,620.7a26.82,26.82,0,0,0,37.37,0ZM444.8,278c1.14,0,2.26,0,3.39.05A166.65,166.65,0,0,1,591,364.85q-.12.4-204.84,201.15Q278.59,460.39,278.67,460.37c-.42-4.88-.67-9.82-.67-14.82C278,353,352.67,278,444.8,278Z" transform="translate(-184 -278)" style="fill-rule:evenodd"/>
              </g>
              <path id="b-2" data-name="b" d="M662.12,369c1.58.76,3.15,1.56,4.67,2.4a93.76,93.76,0,0,1,43.14,50.79c4.07-.38,8.19-.61,12.36-.61A130.94,130.94,0,0,1,853,552.78C853,625.25,794.49,684,722.29,684H295.9C234.1,684,184,633.71,184,571.67A112.24,112.24,0,0,1,227.21,483L367.78,620.7a26.82,26.82,0,0,0,37.37,0ZM444.8,278c1.14,0,2.26,0,3.39.05A166.65,166.65,0,0,1,591,364.85q-.12.4-204.84,201.15Q278.59,460.39,278.67,460.37c-.42-4.88-.67-9.82-.67-14.82C278,353,352.67,278,444.8,278Z" transform="translate(-184 -278)" style="fill:#fff;fill-rule:evenodd"/>
            </svg>
          </div>
        </div>
        <div class="app-name"><b>CLOUD TOOL</b></div>
        <svg
          class="editorial"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28 "
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0
            58-18 88-18s
            58 18 88 18
            58-18 88-18
            58 18 88 18
            v44h-352z"
            />
          </defs>
          <g class="parallax1">
            <use
              xlink:href="#gentle-wave"
              x="50"
              y="3"
              fill="#3861EE"
            />
          </g>
          <g class="parallax2">
            <use
              xlink:href="#gentle-wave"
              x="50"
              y="0"
              fill="#8A23C3"
            />
          </g>
          <g class="parallax3">
            <use
              xlink:href="#gentle-wave"
              x="50"
              y="9"
              fill="#5F43D9"
            />
          </g>
          <g class="parallax4">
            <use
              xlink:href="#gentle-wave"
              x="50"
              y="6"
              fill="#4B40C1"
            />
          </g>
        </svg>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as uuid from 'uuid'
import * as UserApi from '@/api/userApi'
import * as SessionTool from '@/utils/sessionTool'

import { Route } from 'vue-router/types/router'
import { Base64 } from 'js-base64'
import { UserStoreModule } from '@/store/modules/userStore'

Component.registerHooks(['beforeRouteEnter'])

@Component
export default class Login extends Vue {
  private historyRoute: string = ''
  private ssoUrl: string = ''
  private animationFinish: boolean = false
  private loginFinish: boolean = false

  beforeRouteEnter (to: Route, from: Route, next: (vm: any) => void) {
    next((vm: any) => {
      vm.historyRoute = from.fullPath
    })
  }

  created () {
    // 如果登录跳转到首页
    if (SessionTool.getXStreamId()) {
      this.$router.replace({ path: `/` })
    }
    this.getLoginSsoUrl()
  }

  mounted () {
    // 监听事件
    if (!this.$isMobile) {
      window.addEventListener('message', this.onMessage)
    }
  }

  /**
   * @@description 登录
   */
  async login () {
    const uuidText = uuid.v4()
    const req = { uuid: uuidText }
    await UserApi.createUuid(req)
    SessionTool.setUserUUID(uuidText)
    
    window.onfocus = async () => {
      const uuid = SessionTool.getUserUUID()
      if (!uuid) return
      const req = { uuid }
      const xStreamId = await UserApi.getXstreamId(req)
      console.log(xStreamId, 'xStreamId')

      if (!xStreamId) return false

      // 登录成功 
      // 持久化登入储存
      SessionTool.cleanUserUUID()
      sessionStorage.removeItem('xStreamId')
      SessionTool.setXStreamId(xStreamId)
      await UserApi.userExpire()

      const info: any = await UserStoreModule.getUserInfo()

      if (!info.name) {
        this.$router.push({ path: `/401` })
      }
      this.$router.replace({ path: this.historyRoute })
    }

    const gotoUrl = `https://s3.code.hzmantu.com/temp-html/login/cfLogin.html?uuid=${uuidText}`
    window.location.href = `dingtalk://dingtalkclient/page/link?url=${gotoUrl}`
  }

  /**
   * @description 监听iframe 页面传递的参数
   * @param {*} e
   */
  onMessage (e: any) {
    if (typeof e.data === 'object' && 'type' in e.data && 'msg' in e.data) {
      if (e.data.type === 'dd-token') {
        this.tokenLogin(e.data.msg)
      }
      if (e.data.type === 'animation-finish') {
        this.animationFinish = true
        this.judgeJump()
      }
    }
  }

  /**
   * @description 登录
   * @param {*} xStreamId
   */
  async tokenLogin (token: string) {
    try {
      await UserStoreModule.login(token)

      const info: any = await UserStoreModule.getUserInfo()

      if (!info.name) {
        this.$router.push({ path: `/401` })
      } else {
        this.loginFinish = true
        this.judgeJump()
      }
    } catch (error) {
      this.$router.push({ path: `/401` })
    }
  }

  /**
   * @description 判断是否跳转
   */
  judgeJump () {
    if (this.animationFinish && this.loginFinish) {
      window.removeEventListener('message', this.onMessage)
      this.$router.replace({ path: `/` })
    }
  }

  /**
   * @description pc获取登录url
   */
  getLoginSsoUrl () {
    let redirectPath = '/login.html'
    if (window.location.pathname.includes('cloud-tool')) {
      redirectPath = '/cloud-tool/login.html'
    }
    const query = JSON.stringify({
      title: 'CLOUD TOOL',
      redirect: `${window.location.origin}${redirectPath}#/?token=`
    })
    this.ssoUrl = process.env.VUE_APP_LOGIN_API + Base64.encode(query)
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;

  .mobile-login {
    width: 100%;
    height: 100%;
  }

  iframe {
    position: relative;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    border: none;
    -webkit-app-region: drag;
  }

  #loading-login {
    position: absolute;
    top: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    background: #131923;

    .loading-main {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .app-name {
      margin-top: 24px;
      font-size: 36px;
      color: #fff;
      text-align: center;
    }

    /* 波形变形 */
    .square {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 200px;
    }

    .square span:nth-child(1) {
      position: absolute;
      opacity: 0.6;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #8A23C3 0%, #3861EE 100%);
      border: none;
      border-radius: ~'38% 62% 63% 37% / 41% 44% 56% 59%';
      transition: all 0.5s;
      animation: animate 6s linear infinite;
    }

    .square span:nth-child(2) {
      position: absolute;
      opacity: 0.8;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #3861EE 0%, #8A23C3 100%);
      border: none;
      border-radius: ~'38% 62% 63% 37% / 41% 44% 56% 59%';
      transition: all 0.5s;
      animation: animate2 4s linear infinite;
    }

    @keyframes animate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes animate2 {
      0% {
        transform: rotate(360deg);
      }

      100% {
        transform: rotate(0deg);
      }
    }

    .content {
      position: relative;
      z-index: 1000;
      padding: 40px 60px;
      color: #fff;
      text-align: center;
      transition: 0.5s;
    }

    /* 波浪 */

    .editorial {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 5;
      display: block;
      float: left;
      width: 100%;
      height: 12vw;
      margin: 0;
    }

    .parallax1 > use {
      opacity: 0.2;
      animation: move-forever1 10s linear infinite;

      &:nth-child(1) {
        animation-delay: -2s;
      }
    }

    .parallax2 > use {
      opacity: 0.4;
      animation: move-forever2 8s linear infinite;

      &:nth-child(1) {
        animation-delay: -2s;
      }
    }

    .parallax3 > use {
      opacity: 0.6;
      animation: move-forever3 6s linear infinite;

      &:nth-child(1) {
        animation-delay: -2s;
      }
    }

    .parallax4 > use {
      opacity: 0.8;
      animation: move-forever4 4s linear infinite;

      &:nth-child(1) {
        animation-delay: -2s;
      }
    }

    @keyframes move-forever1 {
      0% {
        transform: translate(85px, 0%);
      }

      100% {
        transform: translate(-90px, 0%);
      }
    }

    @keyframes move-forever2 {
      0% {
        transform: translate(-90px, 0%);
      }

      100% {
        transform: translate(85px, 0%);
      }
    }

    @keyframes move-forever3 {
      0% {
        transform: translate(85px, 0%);
      }

      100% {
        transform: translate(-90px, 0%);
      }
    }

    @keyframes move-forever4 {
      0% {
        transform: translate(-90px, 0%);
      }

      100% {
        transform: translate(85px, 0%);
      }
    }
  }
}
</style>
