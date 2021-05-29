import { ErrorAlert } from "../../types/ErrorAlert";
import { MetaErrorInfo } from "./MetaErrorInfo";

export class BloodDonateErrors extends MetaErrorInfo {
    amount: ErrorAlert = new ErrorAlert();
    donor: ErrorAlert = new ErrorAlert();
    doctor: ErrorAlert = new ErrorAlert();
    bloodTest: ErrorAlert = new ErrorAlert();
}
