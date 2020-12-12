<template>
  <div class="login">
    <div
      v-if="$isMobile"
      class="mobile-login"
      @mousedown="onTouchStart"
      @touchstart="onTouchStart"
      @mouseup="onTouchEnd"
      @touchend="onTouchEnd"
    >
      <div ref="center" class="center">
        <h1>Login With Touch ID</h1>
        <svg ref="fingerprint" class="fingerprint" xmlns="http://www.w3.org/2000/svg" viewBox="-1.5 -1.5 136.63 136.56" width="136.63" height="136.56">
          <path class="original" d="M74.79 8.76C34.79 5.41 8.15 33.6 8.2 67.06c.02 9.4 4.71 18.2-3.08 26.3M95.66 6.84C64.75-6.62 35.16-.37 12.83 27.07m92.5-14.8c18.89 14.55 28.33 31.7 28.3 55.56M7.33 36.48C-.21 51.34-1.78 65.35 1.96 82.91m15.46-24.84c11.03-56.46 92.3-55.76 99.67 4.91M49 29.02c16.4-7.37 31.33-5.39 44.7 5.88m-9.5-23.96c34.23 11.28 46.91 41.4 41.55 86.97M19.31 114.08c5.28-4.5 10.26-10.33 12.77-17.5m-5.93 22.53c15.22-12.49 18.45-31.24 16.52-44.59-5.3-27.22 16.68-33.82 26.82-32.75m-60.06 59c13.42-12.83 7.13-24.08 7.23-32.41m-2.3 39.33C42.6 79.8 7.64 65.8 40.34 34.52m.44 93.96a60.94 60.94 0 0 0 14.6-22.67M33.32 124.1c13.22-12.7 20.85-31.39 17.7-50.9m18.23 60.37c7.88-12.08 13-25.79 15.32-41.2m.55-9.96c2.77-42.91-32.4-36.83-34.59-18.61m63.56 50.8c3.44-14.48 5.28-28.43 4.18-41.01m-27.51 55.7c3.05-6.22 6.01-13.64 7.48-20.15m3.93 14.49c11.26-26.47 9.82-68.08-1.45-81.57m-51.14 89.23c15.1-16.79 21.81-39.44 17.4-64.39m-8.1 66.06c21.14-28.19 18.43-54.84 16.26-66.68-2.17-11.83-16.63-9.3-16.27 1.18.37 10.48 2.53 14.1-.36 27.83m21.1 37.03c20.46-36.82 16.97-79.29-.42-87.57m20.9 55.5c15.34-83.72-60.42-79.88-66.48-38.07-1.34 12.78 2.22 14.56.76 25.71" fill="none" stroke-width="3" stroke="#ddd" stroke-linecap="round" stroke-miterlimit="3"/>
          <linearGradient id="a" x1="49.4%" y1="-3.33%" x2="49.87%" y2="102.85%">
            <stop offset="0%" stop-color="#b279f7"/>
            <stop offset="90%" stop-color="#4b52db"/>
          </linearGradient>
          <path class="clone" d="M74.79 8.76C34.79 5.41 8.15 33.6 8.2 67.06c.02 9.4 4.71 18.2-3.08 26.3M95.66 6.84C64.75-6.62 35.16-.37 12.83 27.07m92.5-14.8c18.89 14.55 28.33 31.7 28.3 55.56M7.33 36.48C-.21 51.34-1.78 65.35 1.96 82.91m15.46-24.84c11.03-56.46 92.3-55.76 99.67 4.91M49 29.02c16.4-7.37 31.33-5.39 44.7 5.88m-9.5-23.96c34.23 11.28 46.91 41.4 41.55 86.97M19.31 114.08c5.28-4.5 10.26-10.33 12.77-17.5m-5.93 22.53c15.22-12.49 18.45-31.24 16.52-44.59-5.3-27.22 16.68-33.82 26.82-32.75m-60.06 59c13.42-12.83 7.13-24.08 7.23-32.41m-2.3 39.33C42.6 79.8 7.64 65.8 40.34 34.52m.44 93.96a60.94 60.94 0 0 0 14.6-22.67M33.32 124.1c13.22-12.7 20.85-31.39 17.7-50.9m18.23 60.37c7.88-12.08 13-25.79 15.32-41.2m.55-9.96c2.77-42.91-32.4-36.83-34.59-18.61m63.56 50.8c3.44-14.48 5.28-28.43 4.18-41.01m-27.51 55.7c3.05-6.22 6.01-13.64 7.48-20.15m3.93 14.49c11.26-26.47 9.82-68.08-1.45-81.57m-51.14 89.23c15.1-16.79 21.81-39.44 17.4-64.39m-8.1 66.06c21.14-28.19 18.43-54.84 16.26-66.68-2.17-11.83-16.63-9.3-16.27 1.18.37 10.48 2.53 14.1-.36 27.83m21.1 37.03c20.46-36.82 16.97-79.29-.42-87.57m20.9 55.5c15.34-83.72-60.42-79.88-66.48-38.07-1.34 12.78 2.22 14.56.76 25.71" fill="none" stroke-width="3" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="3" stroke-dasharray="178" stroke-dashoffset="178"/>
        </svg>

        <svg class="icon-success" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r="36" fill="#66bb6a"></circle>
          <path fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="56" stroke-dashoffset="56" d="M17.7,40.9l10.9,10.9l28.7-28.7"></path>
        </svg>
        <div class="scan">Click and hold to scan your finger</div>
        <div class="scan-success">SUCCESS</div>
      </div>
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
  private timer: any = null
  private isMobileLogin: boolean = false


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
      this.onSuccess()
      await this.$delayLoading()
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

  onSuccess () {
    this.isMobileLogin = true
    const fingerprint = this.$refs['fingerprint'] as HTMLDivElement
    const center = this.$refs['center'] as HTMLDivElement
    if (!fingerprint || !center) return
    fingerprint.classList.remove('active')
    center.classList.add('login-success')
  }

  onTouchStart () {
    this.onSuccess()
    if (this.isMobileLogin) return
    const fingerprint = this.$refs['fingerprint'] as HTMLDivElement
    if (!fingerprint) return
    fingerprint.classList.add('active')
    this.timer = setTimeout(this.login, 2000)
  }

  onTouchEnd () {
    const fingerprint = this.$refs['fingerprint'] as HTMLDivElement
    if (!fingerprint) return
    fingerprint.classList.remove('active')
    clearTimeout(this.timer)
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

    .center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      
      svg.fingerprint {
        path.clone {
          transition: stroke-dashoffset 2s ease-out;
        }

        &.active {
          transform: scale(0.97);
          path.clone {
            stroke-dashoffset: 0
          }
        }
      }
        
    }
      

    h1 {
      font-size: 30px;
      transform: translateY(-50px);
    }
      
    .scan,
    .scan-success {
      font-size: 15px;
      transform: translateY(50px);
      color: #666;
    }

    .scan-success {
      display: none
    }
      
    .center {
      .fingerprint,
      .icon-success {
        width: 135px;
        height: 135px;
        overflow: visible;
      }
        
      .icon-success {
        position: absolute;
        top: 40px;

        circle {
          transform-origin: 50% 50%;
          transform: scale(0);
          transition: transform 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }

        path {
          opacity: 0;
          transition: stroke-dashoffset 350ms 100ms ease;
        }
      }
      
      &.login-success {
        .fingerprint {
          transform: scale(0);
        }
          
        .icon-success {
          circle {
            transform: scale(1);
          }

          path {
            stroke-dashoffset: 0;
            opacity: 1;
            transition: opacity 0s, stroke-dashoffset 0.5s;
          }
        }
            
        .scan {
          display: none;
        }

        .scan-success {
          display: block;
        }
      }
    }
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
