export namespace API {
    interface Ratelimit {
        message: string;
        retry_after: string;
        global: boolean;
    }

    interface GatewayDNA {
        url: string;
    }
}