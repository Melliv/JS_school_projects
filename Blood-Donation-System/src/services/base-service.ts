import { HttpClient } from "aurelia";
import { IFetchResponse } from "../types/IFetchResponse";
import { IQueryParams } from "../types/IQueryParams";

export interface IEntityId {
    id: string;
}

export class BaseService<TEntity> {

    constructor(protected apiEndpointUrl: string, protected httpClient: HttpClient, private jwt?: string) {
        // apiEndpointUrl = https://xxx.xxx.xxx.xx/api/v1/ContactTypes

    }

    private authHeaders = this.jwt !== undefined ?
        {
            Pragma: 'no-cache',
            Authorization: 'Bearer ' + this.jwt
        }
        :
        {

        };

    async getAll(queryParams?: IQueryParams): Promise<IFetchResponse<TEntity[]>> {
        let url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            queryParams.forEach(element => {
                url = url + "/" + element;
            });
        }

        try {

            const response = await this.httpClient.fetch(
                url,
                {
                    cache: "no-store",
                    headers: this.authHeaders
                }
            );
            if (response.ok) {
                const data = (await response.json()) as TEntity[];
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

    async get(queryParams?: IQueryParams): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            url = url + "/" + queryParams.id;
        }

        try {

            const response = await this.httpClient.fetch(
                url,
                {
                    cache: "no-store",
                    headers: this.authHeaders
                }
            );
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

    async post(entityBody?: TEntity): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;

        try {

            const response = await this.httpClient.post(
                url,
                JSON.stringify(entityBody),
                {
                    cache: "no-store",
                    headers: this.authHeaders
                }
            );
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

}