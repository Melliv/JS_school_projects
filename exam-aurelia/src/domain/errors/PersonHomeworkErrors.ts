import { ErrorAlert } from "../../types/ErrorAlert";
import { MetaErrorInfo } from "./MetaErrorInfo";

export class PersonHomeworkErrors extends MetaErrorInfo {
    grade: ErrorAlert = new ErrorAlert();
    points: ErrorAlert = new ErrorAlert();
    person: ErrorAlert = new ErrorAlert();
    homework: ErrorAlert = new ErrorAlert();
}
