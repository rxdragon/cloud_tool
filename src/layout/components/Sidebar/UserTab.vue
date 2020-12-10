<template>
  <v-list dense nav>
    <v-list-item>
      <v-list-item-avatar class="align-self-center" color="white" contain>
        <v-img v-if="userAvatar" :src="userAvatar" max-height="40" />
        <v-icon v-else color="grey darken-2" dark>mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-if="userName" v-text="userName"/>
        <v-btn v-else color="grey" text @click="goLogin">登录</v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserStoreModule } from '@/store/modules/userStore'

@Component
export default class UserTab extends Vue {
  // 用户名字
  get userName (): string {
    return UserStoreModule.nickname || UserStoreModule.name
  }

  // 用户头像
  get userAvatar (): string {
    return UserStoreModule.avatarImg
  }

  goLogin () {
    this.$router.push('/login')
  }

}
</script>
