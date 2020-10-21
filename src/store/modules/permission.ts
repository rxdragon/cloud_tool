import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { asyncRoutes, constantRoutes } from '@/router/index'
import { toCapitalHump } from '@/utils/index'
import { RouteConfig } from 'vue-router'
import store from '@/store'


/**
 * @param roles // 权限
 * @param route // 路由
 */
function hasPermission (roles: any[], route: any) {
  return roles.includes(route.name)
}

/**
 * 过滤含有权限路由
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes: any[], roles: any[]) {
  const res: any[] = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export interface IPermissionState {
  routes: RouteConfig[],
  addRoutes: any[],
  personageRouters: any[],
  roles: any[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public addRoutes: any[] = []
  public personageRouters: any[] = []
  public roles: any[] = []

  @Mutation
  public SET_ROUTES (routes: any[]) {
    this.addRoutes = routes
    this.routes = constantRoutes.concat(routes)
  }

  @Mutation
  private SET_ROLES (roles: any[]) {
    this.roles = roles
  }

  @Mutation
  private SET_PERSONAGE_ROUTES (routes: any[]) {
    this.personageRouters = routes
  }

  @Action
  public generateRoutes (roles: any[]) {
    return new Promise(resolve => {
      let accessedRoutes = []
      const newRoles = roles
      let newRolesArr: any[] = []
      const newPermissionArr: any[] = []
      newRoles.forEach(roleItem => {
        if (roleItem.name) {
          const nameArr = roleItem.name.split('.')
          nameArr.length = nameArr.length - 1
          // 全部权限列表
          newPermissionArr.push(toCapitalHump(roleItem.name))
          const componentNames = nameArr.map((item: string) => toCapitalHump(item))
          newRolesArr = [...newRolesArr, ...componentNames]
        }
      })
      this.SET_ROLES(newPermissionArr)
      newRolesArr = [...new Set(newRolesArr)]
      // accessedRoutes = [...filterAsyncRoutes(asyncRoutes, newRolesArr)]
      accessedRoutes = [...asyncRoutes]
      this.SET_PERSONAGE_ROUTES(accessedRoutes)
      this.SET_ROUTES(accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export const PermissionModule = getModule(Permission)
