import { AxiosInstance } from "./types";
import Axios from "./core/Axios";
import { AxiosError } from "./helpers/error";
import {extend} from './helpers/util';;


function createInstance(): AxiosInstance {
    const context = new Axios();
    const instance = AxiosError.prototype.request.bind(context);
    extend(instance, context);
    return instance as AxiosInstance;

}

const axios = createInstance();

export default axios;