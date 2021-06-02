import { ErrorAlert } from "../../types/ErrorAlert";
import { MetaErrorInfo } from "./MetaErrorInfo";

export class PersonSubjectErrors extends MetaErrorInfo {
    subject: ErrorAlert = new ErrorAlert();
}
