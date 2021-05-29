import { EAlertClass } from "./EAlertClass";
import { IAlert } from "./IAlert";

export class ErrorAlert implements IAlert {
    show = true;
    message = "";
    alertClass = EAlertClass.Danger;
}
