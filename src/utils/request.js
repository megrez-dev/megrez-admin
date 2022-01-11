import axios from 'axios';
import host from '@/config/host';
import store from '@/store'
import { MessagePlugin } from 'tdesign-vue';

// const env = import.meta.env.MODE || 'development';

// const API_HOST = env === 'mock' ? '/' : host[env].API; // 如果是mock模式 就不配置host 会走本地Mock拦截
const API_HOST = host['dev'].API

const CODE = {
    SUCCESS: 0,
};

const instance = axios.create({
    baseURL: API_HOST,
    timeout: 1000,
    withCredentials: true,
});

instance.interceptors.retry = 3;

instance.interceptors.request.use(
    config => {
        const token = store.getters.token
        if (token && token.access_token) {
            config.headers['Admin-Authorization'] = token.access_token
        }
        return config
    },
    error => {
        console.log('request error', error)
        MessagePlugin.error('网络请求失败')
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            const { data } = response;
            if (data.code === CODE.SUCCESS) {
                return data;
            }else if (data.code === 100) {
                // TODO: 业务码
                // 重定向到登录 | 弹出登录框
            }
        }else {
            MessagePlugin.error('请求失败')
        }
    },
    (err) => {
        const { config } = err;

        if (!config || !config.retry) return Promise.reject(err);

        config.retryCount = config.retryCount || 0;

        if (config.retryCount >= config.retry) {
            return Promise.reject(err);
        }

        config.retryCount += 1;

        const backoff = new Promise((resolve) => {
            setTimeout(() => {
                resolve({});
            }, config.retryDelay || 1);
        });

        return backoff.then(() => instance(config));
    },
);

export default instance;
