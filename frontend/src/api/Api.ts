import axios, {AxiosResponse} from 'axios';
import {ResolvePlugin} from 'webpack';

enum HttpRequestType {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    REMOVE = 'remove',
}

interface Payload {
    [key: string]: any;
}

const get = <T>(url: string, params: Payload): Promise<T> => {
    return axios.get(url, params).then((response: AxiosResponse) => response.data);
};

const post = <T>(url: string, data: Payload): Promise<T> => {
    return axios.post(url, data).then((response: AxiosResponse) => response.data);
};

const put = <T>(url: string, data: Payload): Promise<T> => {
    return axios.put(url, data).then((response: AxiosResponse) => response.data);
};

const remove = <T>(url: string): Promise<T> => {
    return axios.delete(url).then((response: AxiosResponse) => response.data);
};

export {get, post, put, remove};
