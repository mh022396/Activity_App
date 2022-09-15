import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "http";
import { toast } from "react-toastify";
import { Activity } from "../models/activity";
import { store } from "../store/store";

axios.defaults.baseURL = 'http://localhost:5000/api';

// axios.interceptors.response.use(async response => {
//     try {
//         await sleep(1000);
//         return response;
//     } catch (e) {
//         console.log(e);
//         return await Promise.reject(e);
//     }
// })

axios.interceptors.response.use(async response => {
    //await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config}: {data: any, status: number, config: any} = error.response!;
    switch (status){
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
                window.history.pushState({}, '', '/not-found');
                window.location.reload();
            } 
            //toast.error('bad request');
            if(data.errors){
                const modelStateErrors = [];
                for (const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            //toast.error('not found');
            window.history.pushState({}, '', '/not-found');
            window.location.reload();
            break;
        case 500:
            //toast.error('server error');
            store.commonStore.setServerError(data);
            window.history.pushState({}, '', '/server-error');
            //window.location.reload();
            break;
    }
    return Promise.reject(error);
})

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;