import { message } from 'ant-design-vue';
import axios, { AxiosRequestConfig, Method, AxiosError } from 'axios';
import { stringify } from 'qs';

export interface Request {
  get: any;
  post: any;
  patch?: any;
  delete?: any;
  upload?: any;
  ajax: any;
}

// 实例化
const service = axios.create({
  baseURL: '',
  timeout: 10000,
});

// request 拦截器
service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => Promise.reject(error),
);

// response 拦截器
service.interceptors.response.use(
  (res: any) => {
    return res.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// AxiosRequestConfig 请求config封装
const setRequestConfig = (method: Method, data: any = {}, config: any = {}): AxiosRequestConfig => {
  let result: AxiosRequestConfig = {};
  const methodLower = method.toLocaleLowerCase();
  if (methodLower === 'get') {
    result = {
      params: data,
    };
  }

  if (methodLower === 'post' || config.dataType === 'form' || config.dataType === 'formAndParams') {
    result = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: stringify(data),
    };
  }

  if (config.dataType === 'json' && method === 'delete') {
    result = { data };
  }

  if (config.timeout) {
    result.timeout = config.timeout;
  }
  return result;
};

// ajax 基础入口
const ajax = async (method: Method, url: string, data: any = {}, config: any = {}) => {
  const dataConfig: AxiosRequestConfig = {
    ...setRequestConfig(method, data, config),
    method,
    url,
  };

  try {
    const res: any = await service(dataConfig);
    if (res.notLogin) {
      return Promise.reject(res.data);
    } else {
      const msg = res.message || res.desc || res.msg;
      if (res.success) {
        return Promise.resolve(res);
      } else {
        message.error(msg || '请求错误');
        return Promise.reject(res);
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

// get\post\ajax接口封装
export const request: Request = {
  get(url: string, data?: any, config?: any) {
    return ajax('get', url, data, config);
  },
  post(url: string, data?: any, config?: any) {
    return ajax('post', url, data, config);
  },
  ajax(url: string, data?: any, config?: any) {
    const method = config.method || 'get';
    return ajax(method, url, data, config);
  },
};
