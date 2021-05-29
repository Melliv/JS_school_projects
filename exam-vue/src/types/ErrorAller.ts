import { EAlertClass } from "./EAlertClass";
import { IAlert } from "./IAlert";

export class ErrorAllert implements IAlert {
    show = true;
    message = "";
    alertClass = EAlertClass.Danger;
}
