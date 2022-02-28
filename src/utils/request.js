import axios from 'axios';
import host from '@/config/host';
import router from '@/router'
// import store from '@/store'
import { MessagePlugin } from 'tdesign-vue';

// const env = import.meta.env.MODE || 'development';

// const API_HOST = env === 'mock' ? '/' : host[env].API; // 如果是mock模式 就不配置host 会走本地Mock拦截
const API_HOST = host['dev'].API

const CODE = {
    SUCCESS: 0,
    ERROR: -1,
    NOT_INSTALL: 2,
};

const instance = axios.create({
    baseURL: API_HOST,
    timeout: 10000,
    withCredentials: false,
});

// instance.interceptors.request.use(
//     config => {
//         const token = store.getters.token
//         if (token && token.access_token) {
//             config.headers['Admin-Authorization'] = token.access_token
//         }
//         return config
//     },
//     error => {
//         console.log('request error', error)
//         MessagePlugin.error('网络请求失败')
//         return Promise.reject(error)
//     }
// )

instance.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            if (response.data.status === CODE.SUCCESS) {
                return response.data;
            } else if (response.data.status === CODE.NOT_INSTALL){
                MessagePlugin.warning('请先安装博客');
                router.push({ name: 'Install' });
                return Promise.reject(response);
            }else {
                if (response.data && response.data.msg) {
                    MessagePlugin.warning(response.data.msg)
                }else {
                    MessagePlugin.warning('请求错误')
                }
                return Promise.reject(response);
            }
        } else {
            MessagePlugin.error('请求失败');
            return Promise.reject(response);
        }
    },
    (err) => {
        MessagePlugin.error('请求失败')
        console.log(err)
        return Promise.reject(err);
    },
);

export default instance;
