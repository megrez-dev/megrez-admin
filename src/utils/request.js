import Vue from 'vue'
import axios from 'axios';
import host from '@/config/host';
import router from '@/router'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import store from '@/store'
import { MessagePlugin } from 'tdesign-vue';

// const env = import.meta.env.MODE || 'development';

// const API_HOST = env === 'mock' ? '/' : host[env].API; // 如果是mock模式 就不配置host 会走本地Mock拦截
const API_HOST = host['dev'].API

const CODE = {
    SUCCESS: 0,
    ERROR: -1,
    NOT_INSTALL: 2,

    TOKEN_NOT_EXIST: 1004,
    TOKEN_INVALID: 1005,
    TOKEN_EXPIRED: 1006,

};

const instance = axios.create({
    baseURL: API_HOST,
    timeout: 10000,
    withCredentials: false,
});

instance.interceptors.request.use(function (config) {
    let token = Vue.ls.get(ACCESS_TOKEN)
    config.headers.Authorization = token;
    console.log("token:", token)
    return config;
});

instance.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            if (response.data.status === CODE.SUCCESS) {
                return response.data;
            } else if (response.data.status === CODE.NOT_INSTALL) {
                MessagePlugin.warning('请先安装博客');
                router.push({ name: 'Install' });
                return Promise.reject(response);
            } else if (response.data.status === CODE.TOKEN_NOT_EXIST || response.data.status === CODE.TOKEN_INVALID || response.data.status === CODE.TOKEN_EXPIRED) {
                MessagePlugin.warning('请先登录');
                router.push({ name: 'Login' });
                return Promise.reject(response);
                // TODO: CODE.TOKEN_INVALID, TOKEN_EXPIRED 弹出登录框重新校验
            } else {
                if (response.data && response.data.msg) {
                    MessagePlugin.warning(response.data.msg)
                } else {
                    MessagePlugin.warning('请求错误')
                }
                return Promise.reject(response);
            }
        } else {
            MessagePlugin.error('网络请求失败');
            return Promise.reject(response);
        }
    },
    (err) => {
        MessagePlugin.error('网络请求失败')
        console.log(err)
        return Promise.reject(err);
    },
);

export default instance;
