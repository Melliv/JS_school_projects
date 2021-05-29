import { EAlertClass } from "./EAlertClass";

export interface IAlert {
    show: boolean,
    message: string,
    alertClass: EAlertClass,
}
