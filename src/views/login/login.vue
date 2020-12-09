<template>
  <div class="login d-flex justify-center align-center">
    <v-btn class="blue--text text--lighten-5" color="blue" @click="login">登录</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as uuid from 'uuid'
import * as UserApi from '@/api/userApi'
import * as SessionTool from '@/utils/sessionTool'
import { Route } from 'vue-router/types/router'


Component.registerHooks(['beforeRouteEnter'])

@Component
export default class Login extends Vue {
  private historyRoute: string = ''

  beforeRouteEnter (to: Route, from: Route, next: (vm: any) => void) {
    next((vm: any) => {
      vm.historyRoute = from.fullPath
    })
  }

  /**
   * @@description 登录
   */
  async login () {
    return
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
      SessionTool.setXStreamId(xStreamId)
      this.$router.push(this.historyRoute)
    }

    const gotoUrl = `https://s3.code.hzmantu.com/temp-html/login/cfLogin.html?uuid=${uuidText}`
    window.location.href = `dingtalk://dingtalkclient/page/link?url=${gotoUrl}`
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
}
</style>
