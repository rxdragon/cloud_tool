<template>
  <div class="login">
    <iframe ref="login" class="login_iframe" :src="ssoUrl" />
    <div id="loading-login">
      <div class="loading-main">
        <div class="square">
          <span></span>
          <span></span>
          <span></span>
          <div class="content">
            <svg
              version="1.1"
              width="128"
              height="128"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 128 128"
              style="enable-background: new 0 0 128 128;"
              xml:space="preserve"
            >
              <path
                style="fill: #fff;"
                d="M94.5,51.3c-0.3-0.6-0.6-1.1-1-1.6c0,0,0,0,0,0c-0.1-0.2-0.3-0.3-0.5-0.5c0,0,0,0,0,0
              c0,0-0.1-0.1-0.1-0.1c0,0,0,0,0,0c0,0-0.1,0-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.2-0.1-0.2-0.2c0,0,0,0,0,0
              c-0.8-0.5-1.8-0.8-2.9-0.9c0,0-0.1,0-0.1,0c-0.1,0-0.2,0-0.3,0l-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0.1-0.1,0.2-0.3
              c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.1-0.2,0.1-0.3c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.3,0.2-0.4c0.4-0.8,0.8-1.7,1.2-2.6
              c0.5-1.2,0.9-2.5,1.3-3.7c0.1-0.2,0.1-0.5,0.2-0.7c0-0.1,0-0.2,0.1-0.2c0.1-0.3,0.1-0.5,0.2-0.8c1-4.4,0.9-8.8,0.1-13.4
              c-1-4.8-2.9-8.8-5.8-12.7c-4.3-5.4-8.2-8-13.3-10.2c-1.2-0.5-3.1-1.2-4.8-1.5c0,0,0,0,0,0c0,0,0,0,0,0s0,0,0,0c0,0,0,0,0,0
              c-0.1,0.1-0.2,0.3-0.3,0.5c0,0.1-0.1,0.1-0.1,0.2c-0.1,0.2-0.2,0.4-0.4,0.6c0,0,0,0.1-0.1,0.1c-0.1,0.2-0.3,0.4-0.4,0.6
              c0,0-0.1,0.1-0.1,0.1c-0.2,0.2-0.4,0.5-0.6,0.8c-0.3,0.4-0.6,0.7-0.9,1.1c-1.5,2-3.9,4.5-8,7.3c-1.7,1.1-3.5,2.2-5.7,3.1
              c0,0,0,0,0,0c-1.7,0.7-3.6,1.4-6,1.9c-3.2,0.7-5.5,0.9-9.2,0.8c-0.3,0-0.5,0-0.8,0.1c-1,0.2-1.9,1-2.1,2c-0.1,0.3-0.1,0.7-0.1,1.1
              c0.2,1.4,1.3,2.4,2.8,2.3c0.4,0,0.7-0.1,1.1-0.2c4.7-1.8,9.4-2.5,14.6-1.7c0.2,0,0.9,0.2,1.4,0.3c0,0,0.1,0,0.1,0
              c0.4,0.7,0.8,1.2,1.3,1.8c1.4,1.5,3,2.7,4.8,3.3c0.2,0.1,0.3,0.1,0.5,0.2c0.1,0,0.2,0.1,0.3,0.1c1.9,0.6,3.9,0.7,5.9,0.3
              c3-0.6,5.3-2.1,7.1-4.2c0.2-0.2,0.4-0.5,0.6-0.7c0.3-0.3,0.5-0.3,0.7-0.2c0.1,0.1,0.2,0.2,0.2,0.3c0,0,0,0.1,0,0.1
              c-0.8,2.7-2.4,5.1-4.1,6.9c-0.2,0.2-0.4,0.4-0.6,0.6c0,0,0,0,0,0c-1.4,1.4-3,2.4-5,3.4c-0.9,0.3-2.5,1-4.4,2.1
              c-0.4,0.3-0.9,0.6-1.4,0.9c-2.4,1.6-3.1,2.3-5.4,4.6c-0.5,0.5-1,1.1-1.4,1.7c-0.2,0.2-0.3,0.4-0.4,0.6c0,0,0,0,0,0
              c-0.2,0.3-0.4,0.5-0.6,0.8c-1.6,2.4-2.9,5-3.8,7.8C46.5,57.3,46.4,63,48,68.5c0,0.1,0,0.1,0,0.2c0.1,0.4,0.2,0.8,0.3,1.2
              c0.1,0.3,0.2,0.6,0.3,0.9c0,0.1,0,0.1,0.1,0.2c0.4,1.1,0.9,2.2,1.5,3.3c0,0,0,0.1,0.1,0.1c2.1,4.1,5.2,7.3,8.5,10.2
              c0.2,0.1,0.4,0.3,0.6,0.4c0.7,0.6,1.5,1.3,2.3,1.9c0.4,0.3,0.9,0.7,1.3,1.1c0.7,0.6,1.5,1.3,2.3,2c1.9,1.7,3.7,3.4,5.4,5.2
              c0.8,0.8,1.4,1.6,2,2.4c0.1,0.1,0.1,0.2,0.2,0.2c2.2,3.1,3.4,6.6,3.6,10.5c0.1,3.1-0.4,6.3-2.2,9c-0.4,0.7-0.9,1.3-1.5,1.9
              c-0.2,0.2-0.5,0.5-0.8,0.7c0,0-0.1,0.1-0.1,0.1c-0.2,0.2-0.4,0.3-0.7,0.4c-1.4,0.8-3.1,1.3-4.9,1.2c-1.8-0.1-3.4-0.7-4.7-1.6
              c-2.9-2.1-4.4-5.8-3.5-9.6c0.5-1.8,1.5-3.1,2.6-4.3c0.7-0.7,0.7-1.5,0.4-2.2c-0.1-0.2-0.2-0.3-0.4-0.5c-0.3-0.3-0.6-0.4-1-0.4
              c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.2,0c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c0,0,0,0,0,0
              c-0.4,0.1-0.8,0.4-1.2,0.7c-0.2,0.1-0.3,0.2-0.5,0.4c-0.6,0.5-1.7,1.5-2,2c-2.8,3.5-3.6,7.8-2.3,12v0c0.1,0.2,0.2,0.4,0.3,0.6
              c0.3,0.8,0.6,1.6,1,2.3c2,3.4,6.3,6.3,11.2,6.8c0.2,0,0.5,0,0.7,0.1c0.2,0,0.3,0,0.5,0c0,0,0.1,0,0.1,0c0.2,0,0.5,0,0.7,0
              c0.3,0,0.6,0,0.8,0c0.1,0,0.1,0,0.2,0c0.2,0,0.4,0,0.6,0c0.3,0,0.5-0.1,0.8-0.1c0.2,0,0.4-0.1,0.6-0.1c-0.1,0-0.2,0.1-0.3,0.1
              c4.1-0.6,7.6-2.7,10.6-6.1c2.6-3,4.3-6.4,5.2-10.2c0.9-3.9,0.6-7.7,0.3-11.6c-0.2-3.4-0.9-6.7-1.6-10c-0.8-3.6-1.6-7.1-1.5-11.1
              c0,0,0,0-0.1,0v0c0-0.1,0-0.1,0-0.2c0-5.7,1.3-11,3.7-16c1-2.1,2.1-3.9,3.3-5.6c0.2-0.3,0.4-0.5,0.6-0.8c0.2-0.2,0.3-0.5,0.5-0.7
              c0.3-0.4,0.7-0.9,1.1-1.3c0,0,0.1-0.1,0.1-0.1c0,0,0,0,0.1-0.1c0.1-0.1,0.3-0.3,0.4-0.4c0,0,0-0.1,0.1-0.1c0.2-0.2,0.3-0.4,0.5-0.5
              C93.5,52.5,94,51.8,94.5,51.3C94.5,51.3,94.5,51.3,94.5,51.3C94.5,51.3,94.5,51.3,94.5,51.3z M71.6,127.4c0,0-0.1,0-0.1,0
              C71.5,127.5,71.6,127.5,71.6,127.4z"
              />
            </svg>
          </div>
        </div>
        <div class="app-name"><b>HIMO</b> 在线看片</div>
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
              fill="#efefef"
            />
          </g>
          <g class="parallax2">
            <use
              xlink:href="#gentle-wave"
              x="50"
              y="0"
              fill="#efefef"
            />
          </g>
          <g class="parallax3">
            <use
              xlink:href="#gentle-wave"
              x="50"
              y="9"
              fill="#efefef"
            />
          </g>
          <g class="parallax4">
            <use
              xlink:href="#gentle-wave"
              x="50"
              y="6"
              fill="#efefef"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { Base64 } from 'js-base64'
export default {
  name: 'Login',
  props: {},
  data () {
    return {
      ssoUrl: '',
      animationFinish: false,
      loginFinish: false
    }
  },
  async created () {
    // 判断是否已经登录
    if (sessionStorage.getItem('xStreamId')) {
      const base = this.$router.options.base
      this.$router.push({ path: `${base}/` })
    }
    this.getLoginSsoUrl()
  },
  mounted () {
    // 监听事件
    window.addEventListener('message', this.onMessage)
  },
  methods: {
    /**
     * @description 监听iframe 页面传递的参数
     * @param {*} e
     */
    onMessage (e) {
      if (typeof e.data === 'object' && 'type' in e.data && 'msg' in e.data) {
        if (e.data.type === 'dd-token') {
          this.tokenLogin(e.data.msg)
        }
        if (e.data.type === 'animation-finish') {
          this.animationFinish = true
          this.judgeJump()
        }
      }
    },
    /**
     * @description 登录
     * @param {*} code
     */
    async tokenLogin (token) {
      try {
        await this.$store.dispatch('userStore/login', token)
        const info = await this.$store.dispatch('userStore/getUserInfo')
        if (!info.name) {
          const base = this.$router.options.base
          this.$router.push({ path: `${base}/401` })
        } else {
          this.loginFinish = true
          this.judgeJump()
        }
      } catch (error) {
        const base = this.$router.options.base
        this.$router.push({ path: `${base}/401` })
      }
    },
    /**
     * @description 转码
     */
    getLoginSsoUrl () {
      let redirectPath = '/login.html'
      if (window.location.pathname.includes('picture-online-web')) {
        redirectPath = '/picture-online-web/login.html'
      }
      const query = JSON.stringify({
        title: '缦图云端',
        redirect: `${window.location.origin}${redirectPath}#/?token=`
      })
      this.ssoUrl = process.env.VUE_APP_LOGIN_API + Base64.encode(query)
    },
    /**
     * @description 判断是否跳转
     */
    judgeJump () {
      if (this.animationFinish && this.loginFinish) {
        window.removeEventListener('message', this.onMessage)
        const base = this.$router.options.base
        this.$router.push({ path: `${base}/` })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
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
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #fc7d25 0%, #ffbf66 100%);
      border: none;
      border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
      transition: all 0.5s;
      animation: animate 6s linear infinite;
    }

    .square span:nth-child(2) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #1a7785 0%, #52a6b3 100%);
      border: none;
      border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
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
      animation: move-forever1 10s linear infinite;

      &:nth-child(1) {
        animation-delay: -2s;
      }
    }

    .parallax2 > use {
      animation: move-forever2 8s linear infinite;

      &:nth-child(1) {
        animation-delay: -2s;
      }
    }

    .parallax3 > use {
      animation: move-forever3 6s linear infinite;

      &:nth-child(1) {
        animation-delay: -2s;
      }
    }

    .parallax4 > use {
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
