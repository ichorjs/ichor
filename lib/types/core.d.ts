import { Method } from "axios";

export interface ClientGenome {
    token: string;
}

export interface RequestGenomeParams<K extends object> {
    auth?: boolean;
    json?: K;
    method: Method;
}

export type VioletClientEvents = {
    ratelimit: () => void;
    debug: (message: string) => void;
}