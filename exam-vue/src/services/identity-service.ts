import { ILoginResponse } from './../types/ILoginResponse';
import Axios, { AxiosError } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';
import { Register } from '@/domain/DTO/Register';

export abstract class IdentityService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    static async Login(apiEndpoint: string, loginData: {email: string, password:string}): Promise<IFetchResponse<ILoginResponse>> {
        const loginDataJson = JSON.stringify(loginData);
        try {
            const response = await this.axios.post<ILoginResponse>(apiEndpoint, loginDataJson);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };
        } catch (err) {
            const error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: typeof (error.response!.data) === 'string' ? error.response!.data : (error.response?.data as IMessages).messages.toString()
            }
        }
    }

    static async Register(apiEndpoint: string, registerData: Register): Promise<IFetchResponse<ILoginResponse>> {
        const loginDataJson = JSON.stringify(registerData);
        try {
            const response = await this.axios.post<ILoginResponse>(apiEndpoint, loginDataJson);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };
        } catch (err) {
            const error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: typeof (error.response!.data) === 'string' ? error.response!.data : (error.response?.data as IMessages).messages.toString()
            }
        }
    }
}
