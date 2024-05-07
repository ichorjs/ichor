export namespace API {
    interface Ratelimit {
        message: string;
        retry_after: number;
        global: boolean;
    }

    interface GatewayDNA {
        url: string;
    }
}