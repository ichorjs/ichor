import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { urls } from "../Constants";
import { RequestGenomeParams} from "../types/core";
import Client from "../Client";

import { repository, version } from "../../package.json";

export default class {
    public ratelimits: { [key: string]: number } = {};
    public queue: string[] = [];

    constructor(private client: Client) {}

    public async makeRequest<K extends object, R>
        (endpoint: string, options?: RequestGenomeParams<K>) {
        const opt = Object.assign({ auth: true }, options);

        this._make<R>(
            endpoint,
            opt.auth,
            opt.method,
            opt.json
        );
    }

    public handleRequest(endpoint: string, response: AxiosResponse) {
        //console.log(endpoint, response)
    }

    private async _make<R>(
        endpoint: string, 
        auth: boolean, 
        method: Method,
        json: object | undefined) {
            
        const options: AxiosRequestConfig = {};
        const headers: any = {};

        if (auth) {
            headers["Authorization"] = this.client.options.token;
        }

        if (json) {
            headers["Content-Type"] = "application/json";
            options.data = JSON.stringify(json);
        }

        //console.log(options)

        return axios<R>({ 
            url: `${urls.rest}${endpoint}`,
            method,
            headers,
            ...options
        })
        .then((res) => this.handleRequest(endpoint, res))
        .catch((err) => console.log(err));
    }
}