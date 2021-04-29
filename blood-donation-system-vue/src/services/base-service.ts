import { IFetchResponse } from "@/types/IFetchResponse";
import { IQueryParams } from "@/types/IQueryParams";
import axios from 'axios';

export class BaseService<TEntity> {
    constructor(protected apiEndpointUrl: string, private jwt?: string) {
        console.log('BaseService.constructor');
        // apiEndpointUrl = https://xxx.xxx.xxx.xx/api/v1/ContactTypes
    }

    private authHeaders = this.jwt !== undefined
        ? {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
            Authorization: 'Bearer ' + this.jwt
        } : {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
        };

    async getAll(queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity[]>> {
        let url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            // TODO: add query params to url
            url = url + "/" + queryParams[0];
        }

        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity[],
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

    async get(queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            // TODO: add query params to url
            url = url + "/" + queryParams[0];
        }

        try {
            const response = await axios.get(url, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
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

    async put(queryParams?: IQueryParams, entityBody?: TEntity): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            // TODO: add query params to url
            url = url + "/" + queryParams[0];
        }

        try {
            const response = await axios.put(url, { headers: this.authHeaders, body: entityBody });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
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
        const url = this.apiEndpointUrl;

        try {
            const response = await axios.post(url, entityBody, { headers: this.authHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data as TEntity,
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
