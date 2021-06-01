import { ErrorAlert } from "../../types/ErrorAlert";
import { MetaErrorInfo } from "./MetaErrorInfo";

export class HomeworkErrors extends MetaErrorInfo {
    name: ErrorAlert = new ErrorAlert();
    maxPoints: ErrorAlert = new ErrorAlert();
    subject: ErrorAlert = new ErrorAlert();
    dateOfSubmission: ErrorAlert = new ErrorAlert();
    person: ErrorAlert = new ErrorAlert();
}
