import { isPlainObject } from './util';

function normalizeHeadersName(headers: any, normalizedName: string): void {
    if (!headers) {
        return;
    }
    Object.keys(headers).forEach((name) => {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name];
            delete headers[name];
        }
    })
}

export function processHeaders(header: any, data: any): any {
    normalizeHeadersName(header, 'Content-Type');
    if (isPlainObject(data)) {
        if (header && !header['Content-Type']) {
            header['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return header;
}

export function parseHeaders(headers: string): any {
    let parsed = Object.create(null);
    if (!headers) {
        return parsed;
    }
    headers.split('\r\n').forEach((line) => {
        let [key, value] = line.split(':');
        key = key.trim().toLowerCase();
        if (!key) {
            return;
        }
        if (value) {
            value.trim();
        }
        parsed[key] = value;
    });
    return parsed;
}