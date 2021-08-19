import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [


    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    // {
    //     path: '/table',
    //     component: Layout,
    //     redirect: '/table/index',
    //     children: [{
    //         path: 'index',
    //         name: 'Table',
    //         component: () =>
    //             import ('@/views/table/index'),
    //         meta: { title: '表格', icon: 'dashboard' }
    //     }]
    // },
    {
        path: '/',
        component: Login
    },
    // 首页
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        children: [{
            path: 'index',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },
    //可视化 
    {
        path: '/visualization',
        component: Layout,
        redirect: '/visualization/topology',
        name: 'Visualization',
        meta: { title: '可视化', icon: 'el-icon-s-help' },
        children: [{
                path: 'topology',
                name: 'Topology',
                component: () =>
                    import ('@/views/visualization/topology'),
                meta: { title: '拓扑图' }
            },
            {
                path: 'threeD',
                name: 'threeD',
                component: () =>
                    import ('@/views/visualization/threeD'),
                meta: { title: '三维展示' }
            }
        ]
    },
    // 设备监控
    {
        path: '/monitor/',
        component: Layout,
        redirect: '/monitor/autocontrol',
        name: 'Monitor',
        meta: { title: '设备监控', icon: 'el-icon-camera-solid' },
        children: [{
                path: 'autocontrol',
                name: 'Autocontrol',
                component: () =>
                    import ('@/views/monitor/autocontrol'),
                meta: { title: '设备监控' }
            }, ]
            //     {
            //         path: 'communication',
            //         name: 'Communication',
            //         component: () =>
            //             import ('@/views/monitor/communication'),
            //         meta: { title: '通信' }
            //     },
            //     {
            //         path: 'electric',
            //         name: 'Electric',
            //         component: () =>
            //             import ('@/views/monitor/electric'),
            //         meta: { title: '电气' }
            //     },
            //     {
            //         path: 'technology',
            //         name: 'Technology',
            //         component: () =>
            //             import ('@/views/monitor/technology'),
            //         meta: { title: '工艺' }
            //     }
            // ]
    },
    // 安全管理
    {
        path: '/safe',
        component: Layout,
        redirect: '/safe/monitor',
        name: 'Safe',
        meta: { title: '安全管理', icon: 'el-icon-warning' },
        children: [{
                path: 'monitor',
                name: 'Safe-monitor',
                component: () =>
                    import ('@/views/safe/monitor'),
                meta: { title: '安全监控' }
            },
            {
                path: 'device',
                name: 'Safe-device',
                component: () =>
                    import ('@/views/safe/device'),
                meta: { title: '安全设备' }
            },
            {
                path: 'event',
                name: 'Safe-event',
                component: () =>
                    import ('@/views/safe/event'),
                meta: { title: '安全事件' }
            },
            {
                path: 'selfcheck',
                name: 'Safe-selfcheck',
                component: () =>
                    import ('@/views/safe/selfcheck'),
                meta: { title: '安全自查' }
            }
        ]
    },
    //巡检管理
    {
        path: '/patrol',
        component: Layout,
        redirect: '/patrol/autocontrol',
        name: 'Patrol',
        meta: { title: '巡检管理', icon: 'el-icon-s-check' },
        children: [{
                path: 'autocontrol',
                name: 'Autocontrol',
                component: () =>
                    import ('@/views/patrol/autocontrol'),
                meta: { title: '巡检管理' }
            }, ]
            //     {
            //         path: 'communication',
            //         name: 'Communication',
            //         component: () =>
            //             import ('@/views/patrol/communication'),
            //         meta: { title: '通信' }
            //     },
            //     {
            //         path: 'electric',
            //         name: 'Electric',
            //         component: () =>
            //             import ('@/views/patrol/electric'),
            //         meta: { title: '电气' }
            //     },
            //     {
            //         path: 'technology',
            //         name: 'Technology',
            //         component: () =>
            //             import ('@/views/patrol/technology'),
            //         meta: { title: '工艺' }
            //     }
            // ]
    },
    //设备管理
    {
        path: '/device',
        component: Layout,
        redirect: '/device/list',
        name: 'device',
        meta: { title: '设备管理', icon: 'el-icon-s-management' },
        children: [{
                path: 'list',
                name: 'Device-list',
                component: () =>
                    import ('@/views/device/list'),
                meta: { title: '设备列表' }
            },
            {
                path: 'maintenance',
                name: 'Device-maintenance',
                component: () =>
                    import ('@/views/device/maintenance'),
                meta: { title: '设备维护' }
            },
            {
                path: 'verification',
                name: 'Device-verification',
                component: () =>
                    import ('@/views/device/verification'),
                meta: { title: '设备检定' }
            },
            {
                path: 'spare',
                name: 'Device-spare',
                component: () =>
                    import ('@/views/device/spare'),
                meta: { title: '备件管理' }
            }
        ]
    },

    //文档中心
    {
        path: '/document',
        component: Layout,
        redirect: '/document/index',
        name: 'Document',
        meta: { title: '文档中心', icon: 'el-icon-s-help' },
        children: [{
            path: 'index',
            name: 'Document-index',
            component: () =>
                import ('@/views/document/index'),
            meta: { title: '文档中心' }
        }]
    },
    // 数据分析
    {
        path: '/analysis',
        component: Layout,
        redirect: '/analysis/failure',
        name: 'Analysis',
        meta: { title: '数据分析', icon: 'el-icon-s-opportunity' },
        children: [{
                path: 'failure',
                name: 'Analysis-failure',
                component: () =>
                    import ('@/views/analysis/failure'),
                meta: { title: '故障分析' }
            },
            {
                path: 'patrol',
                name: 'Analysis-patrol',
                component: () =>
                    import ('@/views/analysis/patrol'),
                meta: { title: '巡检分析' }
            }, {
                path: 'device',
                name: 'Analysis-device',
                component: () =>
                    import ('@/views/analysis/device'),
                meta: { title: '设备分析' }
            }
        ]
    },
    // 系统管理
    {
        path: '/setting',
        component: Layout,
        redirect: '/setting/autocontrol',
        name: 'Setting',
        meta: { title: '系统管理', icon: 'el-icon-s-data' },
        children: [{
                path: 'autocontrol',
                name: 'Autocontrol',
                component: () =>
                    import ('@/views/setting/autocontrol'),
                meta: { title: '自控' }
            },
            {
                path: 'communication',
                name: 'Communication',
                component: () =>
                    import ('@/views/setting/communication'),
                meta: { title: '通信' }
            },
            {
                path: 'electric',
                name: 'Electric',
                component: () =>
                    import ('@/views/setting/electric'),
                meta: { title: '电气' }
            },
            {
                path: 'technology',
                name: 'Technology',
                component: () =>
                    import ('@/views/setting/technology'),
                meta: { title: '工艺' }
            },
            {
                path: 'user',
                name: 'User',
                component: () =>
                    import ('@/views/setting/user'),
                meta: { title: '用户管理' }
            },
            {
                path: 'org',
                name: 'Org',
                component: () =>
                    import ('@/views/setting/org'),
                meta: { title: '组织管理' }
            },
            {
                path: 'other',
                name: 'Other',
                component: () =>
                    import ('@/views/setting/other'),
                meta: { title: '其他设置' }
            }
        ]
    },

    // {
    //   path: 'external-link',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    //       meta: { title: 'External Link', icon: 'link' }
    //     }
    //   ]
    // },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router