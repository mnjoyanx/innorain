import axios from "axios";
import {getItem} from '@/helpers/storage'

axios.defaults.baseURL = "http://185.223.125.144:4000/admin";

axios.interceptors.request.use(config => {
    const token = getItem('accessToken')
    const authorizationToken = token ? token : ''
    config.headers.authorization = authorizationToken
    return config
})

export default axios;
