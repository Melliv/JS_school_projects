import { bindable, HttpClient } from "aurelia";
import { EPageStatus } from "../types/EPageStatus";
import { PageLoader } from "../types/PageLoader";

export class Loader {

    @bindable
    value: PageLoader;
    pageStatusLoading: EPageStatus = EPageStatus.Loading;
    pageStatusError: EPageStatus = EPageStatus.Error;
    pageStatusOk: EPageStatus = EPageStatus.OK;
    pageStatusCantDelete: EPageStatus = EPageStatus.CantDelete;


    constructor(protected httpClient: HttpClient) {
    }

}
