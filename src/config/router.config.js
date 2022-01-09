import BlankLayout from '@/layouts/BlankLayout.vue'

export const routes = [
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