import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { urls } from "../Constants";
import { RequestGenomeParams } from "../types/core";
import Client from "../Client";

import { repository, version } from "../../package.json";
import { API } from "../types/api";

export default class {
    public queue: string[] = [];
    #timeout!: Timer;

    constructor(private client: Client) { }

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

    private async _make<R>(
        endpoint: string,
        auth: boolean,
        method: Method,
        json: object | undefined) {

            console.log(this.queue.length < 50)

        if (this.queue.length < 50) {
            if (!this.#timeout) {
                this.#timeout = setTimeout(() => this.queue = [], 1000);
            }

            const options: AxiosRequestConfig = {};
            const headers: any = {};

            headers["User-Agent"] = `Ichor (${repository}, ${version})`;

            if (auth) {
                headers["Authorization"] = this.client.options.token;
            }

            if (json) {
                headers["Content-Type"] = "application/json";
                options.data = JSON.stringify(json);
            }

            const handleError = (err: AxiosError) => {
                if (err.response) {
                    if (err.response.status === 429) {
                        const ratelimit = err.response.data as API.Ratelimit;

                        this.client.emit("ratelimit");
                        console.log(err.request)
                        if (err.response.headers["X-RateLimit-Remaining"]) {
                            setTimeout(() => 
                                this._make(endpoint, auth, method, json), ratelimit.retry_after * 3);
                        }
                    }
                } else {
                    this.client.emit("debug", "No error response");
                }
            }

            const handleRequest = (res: AxiosResponse) => {
                this.queue.push(endpoint);
            }

            return axios<R>({
                url: `${urls.rest}${endpoint}`,
                method,
                headers,
                ...options
            })
            .then(handleRequest)
            .catch(handleError);
        } else {

            this.client.emit("debug", "Hit global limit in 1 second."); // Shouldn't be possible
        }
    }
}