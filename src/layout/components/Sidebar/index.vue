<template>
  <v-navigation-drawer
    app
    mobile-breakpoint="960"
    v-model="drawer"
    color="#fff"
  >
    <template v-slot:img="props">
      <v-img class="back-img" v-bind="props"/>
    </template>
    <!-- 用户信息 -->
    <v-img :aspect-ratio="16/16" :src="require('../../../assets/back.jpg')">
      <v-row align="end" class="lightbox white--text fill-height">
        <v-col>
          <user-tab />
        </v-col>
      </v-row>
    </v-img>
    <v-list dense>
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </v-list>
  </v-navigation-drawer>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PermissionModule } from '@/store/modules/permission'
import { SettingModule } from '@/store/modules/setting'
import SidebarItem from './SidebarItem.vue'
import UserTab from './UserTab.vue'

@Component({
  components: { SidebarItem, UserTab }
})

export default class Sidebar extends Vue {
  private barImage: string = 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg'
  private barColor: string = 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)'
  private items: object[] = [
    { icon: 'mdi-trending-up', text: 'Most Popular' },
    { icon: 'mdi-youtube-subscription', text: 'Subscriptions' },
    { icon: 'mdi-history', text: 'History' },
    { icon: 'mdi-playlist-play', text: 'Playlists' },
    { icon: 'mdi-clock', text: 'Watch Later' }
  ]

  get routes () {
    return PermissionModule.routes
  }

  get drawer (): null | boolean {
    return SettingModule.drawer
  }
  set drawer (val: null | boolean) {
    SettingModule.setDrawer(val)
  }
}
</script>

<style lang="less" scoped>
.back-img {
  /deep/ .v-image__image--preload {
    filter: blur(0);
  }
}

.lightbox {

}
</style>
