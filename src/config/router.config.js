// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: [ 'dashboard' ] }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },
      // 市场活动
      {
        path: '/activity',
        redirect: '/activity/list',
        component: RouteView,
        meta: { title: '市场活动', icon: 'build', permission: [ 'form' ] },
        children: [
          {
            path: '/activity/list/:pageNo([1-9]\\d*)?',
            name: 'ActivityInfo',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/activity/ActivityList'),
            meta: { title: '活动管理', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      // 线索管理
      {
        path: '/clue',
        redirect: '/clue/list',
        component: RouteView,
        meta: { title: '线索管理', icon: 'team', permission: [ 'form' ] },
        children: [
          {
            path: '/clue/list/:pageNo([1-9]\\d*)?',
            name: 'ClueInfo',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/clue/ClueList'),
            meta: { title: '线索信息', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/clue/follow',
            name: 'FollowRecord',
            component: () => import('@/views/follow/FollowList'),
            meta: { title: '跟踪记录', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/clue/drive',
            name: 'TestDrive',
            component: () => import('@/views/drive/DriveList'),
            meta: { title: '试乘试驾', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      // 交易
      {
        path: '/trade',
        redirect: '/trade/list',
        component: RouteView,
        meta: { title: '交易', icon: 'trademark', permission: [ 'form' ] },
        children: [
          {
            path: '/trade/list/:pageNo([1-9]\\d*)?',
            name: 'TradeInfo',
            hideChildrenInMenu: true,
            component: () => import('@/views/trade/TradeList'),
            meta: { title: '交易信息', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },
      // 系统管理
      {
        path: '/system',
        redirect: '/system/user',
        component: RouteView,
        meta: { title: '系统管理', icon: 'appstore', permission: [ 'form' ] },
        children: [
          {
            path: '/system/user/:pageNo([1-9]\\d*)?',
            name: 'UserInfo',
            hideChildrenInMenu: true,
            component: () => import('@/views/system/UserList'),
            meta: { title: '用户信息', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/system/department',
            name: 'Department',
            component: () => import('@/views/department/DepartmentList'),
            meta: { title: '部门信息', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/system/dictionary',
            name: 'dictionary',
            component: () => import('@/views/dictionary/DictionaryList'),
            meta: { title: '数据字典', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
