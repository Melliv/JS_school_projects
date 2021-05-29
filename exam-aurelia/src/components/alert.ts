import { bindable, HttpClient } from "aurelia";

import { IAlert } from "../types/IAlert";

export class Alert {

    @bindable
    value: IAlert;

    constructor(protected httpClient: HttpClient) {
    }


}
