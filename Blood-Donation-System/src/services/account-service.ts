import { HttpClient } from "aurelia";
import { IFetchResponse } from "../types/IFetchResponse";
import { IJwt } from "../types/IJwt";
import { IMessage } from "../types/IMessage";

export class AccountService {

    protected apiEndpointUrl: string = "";

    constructor(uri: string, protected httpClient: HttpClient) {
        this.apiEndpointUrl = "http://blooddonate.azurewebsites.net/api/v1/" + uri
        // https://localhost:5051/api/v1/
        // http://blooddonate.azurewebsites.net/api/v1/
    }

    async login(email: string, password: string): Promise<IFetchResponse<IJwt | IMessage>> {
        let url = this.apiEndpointUrl;


        try {
            let body = {email, password};
            let bodyStr = JSON.stringify(body);

            const response = await this.httpClient.post(url, bodyStr , { cache: "no-store" });

            if (response.ok) {
                const data = (await response.json()) as IJwt;
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            // TODO: why cant i do this?
            const data = (await response.json()) as IMessage;

            return {
                statusCode: response.status,
                errorMessage: response.statusText + ' ' + data.messages.join(' '),
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

}