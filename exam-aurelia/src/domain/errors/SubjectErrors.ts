import { ErrorAlert } from "../../types/ErrorAlert";
import { MetaErrorInfo } from "./MetaErrorInfo";

export class SubjectErrors extends MetaErrorInfo {
    name: ErrorAlert = new ErrorAlert();
    person: ErrorAlert = new ErrorAlert();
}
