import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse,ResolvedFn, RejectedFn } from "../types";
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './IntercepptorManager';

interface Interceptor {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
}

interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
    rejected?: ResolvedFn<T>
}

export default class Axios {

    interceptors: Interceptor;
    constructor() {
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>()
        }
    }

    request(config: AxiosRequestConfig): AxiosPromise {
        return dispatchRequest(config);
        const chain: PromiseChain<any>[]=[{
            resolved: dispatchRequest,
            rejected: undefined
        }]
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config);
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config);
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config);
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config);
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }

    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
        return this.request(Object.assign(config || [], {
            method,
            url
        }))
    }

    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request(Object.assign(config || [], {
            method,
            data,
            url
        }))
    }

}