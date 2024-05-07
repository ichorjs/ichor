import Client from "../lib/Client";
import restRoutes from "../lib/rest/rest.routes";
import { API } from "../lib/types/api";

const client = new Client({
    token: ""
});

client.rest.makeRequest(restRoutes.message("749619975492206653"), {
    method: "POST",
    json: {
        content: "e"
    }
});