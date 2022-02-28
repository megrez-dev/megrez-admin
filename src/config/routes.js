import BasicLayout from '@/layouts/BasicLayout'
import BlankLayout from '@/layouts/BlankLayout'

export const menuRoutes = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: { title: '首页' },
        redirect: '/overview',
        children: [
            {
                path: '/overview',
                component: () => import('@/views/article/ArticleList.vue'),
                name: 'Overview',
                meta: { title: '总览', icon: 'dashboard' }
            },
            {
                path: '/static',
                component: () => import('@/views/article/ArticleList.vue'),
                name: 'Static',
                meta: { title: '统计', icon: 'chart' }
            },
            {
                path: '/article',
                component: BlankLayout,
                redirect: '/article/list',
                name: 'Article',
                meta: { title: '文章', icon: 'view-module' },
                children: [
                    {
                        path: 'list',
                        component: () => import('@/views/article/ArticleList.vue'),
                        name: 'ArticleList',
                        meta: { title: '所有文章', icon: 'view-module' },
                    },
                    {
                        path: 'edit',
                        component: () => import('@/views/article/ArticleEdit.vue'),
                        name: 'ArticleEdit',
                        meta: { title: '写文章', icon: 'edit-1' },
                    },
                ],
            },
            {
                path: '/links',
                component: () => import('@/views/links/Links.vue'),
                name: 'Links',
                meta: { title: '友链', icon: 'link' }
            },
            {
                path: '/journal',
                component: () => import('@/views/journal/Journal.vue'),
                name: 'Journal',
                meta: { title: '日志', icon: 'edit-1' }
            },
            {
                path: '/comment',
                component: () => import('@/views/article/ArticleList.vue'),
                name: 'Comment',
                meta: { title: '评论', icon: 'edit-1' }
            },
        ]
    },
    // {
    //     path: '*',
    //     redirect: '/404',
    //     hidden: true
    // },
]
export const hiddenRoutes = [
    {
        path: '/login',
        name: 'Login',
        meta: { title: '登录' },
        component: () => import('@/views/static/Login')
    },
    {
        path: '/install',
        name: 'Install',
        meta: { title: '安装向导' },
        component: () => import('@/views/static/Install')
    },
]

export const routes = menuRoutes.concat(hiddenRoutes);