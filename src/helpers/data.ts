import {isPlainObject} from './util';

export function transfromRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}

export function transfromResponse(data: any):any{
    if (typeof data === 'string' ){
        try {
            data = JSON.parse(data);
        } catch (error) {
            //do nothing
        }
    }
    return data;
}