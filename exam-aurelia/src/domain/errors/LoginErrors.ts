import { ErrorAlert } from "../../types/ErrorAlert";
import { MetaErrorInfo } from "./MetaErrorInfo";

export class LoginErrors extends MetaErrorInfo {
    email: ErrorAlert = new ErrorAlert();
    password: ErrorAlert = new ErrorAlert();
}
