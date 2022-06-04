import BasicLayout from '@/layouts/BasicLayout'
import BlankLayout from '@/layouts/BlankLayout'

export const menuRoutes = [
    {
        path: '/',
        name: 'Index',
        component: BasicLayout,
        meta: { title: '首页', icon: 'home' },
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/Dashboard.vue'),
                name: 'Dashboard',
                meta: { title: '仪表盘', icon: 'dashboard' }
            },
            // {
            //     path: '/statistic',
            //     component: () => import('@/views/statistic/Statistic.vue'),
            //     name: 'Statistic',
            //     meta: { title: '统计', icon: 'chart' }
            // },
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
                component: () => import('@/views/journal/JournalList.vue'),
                name: 'Journal',
                meta: { title: '日志', icon: 'edit-1' }
            },
            {
                path: '/comment',
                component: () => import('@/views/comment/CommentList.vue'),
                name: 'Comment',
                meta: { title: '评论', icon: 'edit-1' }
            },
            {
                path: '/appearance',
                component: BlankLayout,
                redirect: '/appearance/theme',
                name: 'Appearance',
                meta: { title: '外观', icon: 'view-module' },
                children: [
                    {
                        path: 'theme',
                        component: () => import('@/views/appearance/Theme.vue'),
                        name: 'Theme',
                        meta: { title: '主题', icon: 'view-module' },
                    },
                    {
                        path: 'setting',
                        component: () => import('@/views/appearance/ThemeSetting.vue'),
                        name: 'ThemeSetting',
                        meta: { title: '主题设置', icon: 'edit-1' },
                    },
                    // {
                    //     path: 'edit',
                    //     component: () => import('@/views/appearance/ThemeEdit.vue'),
                    //     name: 'ThemeEdit',
                    //     meta: { title: '主题编辑', icon: 'edit-1' },
                    // },
                ],
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