import {AxiosRequestConfig, AxiosResponse} from '../types';

export class AxiosError extends Error {
    config: AxiosRequestConfig;
    isAxiosError: boolean;
    code?: string|null;
    request?: any;
    response?: AxiosResponse;

    constructor(message: string, config: AxiosRequestConfig,
        code?: string|null, request?: any,
        response?: AxiosResponse) {
            super(message);
            this.config = config;
            this.isAxiosError = true;
            this.code = code;
            this.request = request;
            this.response = response;

            Object.setPrototypeOf(this, AxiosError.prototype);
    }
}

export function createError(message: string, config: AxiosRequestConfig,
    code?: string|null, request?: any,
    response?: AxiosResponse) {
        const error = new AxiosError(message,config,code,request,response);
        return error;
    }