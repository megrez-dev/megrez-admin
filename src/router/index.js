import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from '@/config/router.config.js'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})