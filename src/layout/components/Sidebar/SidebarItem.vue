<template>
  <div>
    <v-list v-if="!item.meta || !item.meta.hidden" nav class="menu-wrapper">
      <!-- 单个菜单 -->
      <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
        <v-list-item v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)"  active-class="primary">
          <v-list-item-icon >
            <v-icon>{{ theOnlyOneChild.meta.icon || (item.meta && item.meta.icon) }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ theOnlyOneChild.meta.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list-group
        v-else
        :prepend-icon="item.meta.icon"
        no-action
        :color="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)' ? 'white' : 'grey darken-1'"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.meta.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </v-list-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import { RouteConfig } from 'vue-router'
import { isExternal } from '@/utils/validate' // 是否是网址
import path from 'path'

import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SidebarItem extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: RouteConfig
  @Prop({ type: Boolean, default: false }) readonly isNest!: boolean
  @Prop({ type: String, default: '' }) readonly basePath!: string

  private barColor: string = 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)'

  get alwaysShowRootMenu () {
    if (this.item.meta && this.item.meta.alwaysShow) {
      return true
    }
    return false
  }

  get showingChildNumber () {
    if (this.item.children) {
      const showingChildren = this.item.children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return false
        } else {
          return true
        }
      })
      return showingChildren.length
    }
    return 0
  }

  get theOnlyOneChild () {
    if (this.showingChildNumber > 1) {
      return null
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: '' }
  }

  private resolvePath (routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(this.basePath)) {
      return this.basePath
    }
    return path.resolve(this.basePath, routePath)
  }
}
</script>
