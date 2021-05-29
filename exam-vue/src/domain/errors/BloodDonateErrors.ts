import { ErrorAllert } from "@/types/ErrorAller";
import { MetaErrorInfo } from "./MetaErrorInfo";

export class BloodDonateErrors extends MetaErrorInfo {
    amount: ErrorAllert = new ErrorAllert();
    donor: ErrorAllert = new ErrorAllert();
    doctor: ErrorAllert = new ErrorAllert();
    bloodTest: ErrorAllert = new ErrorAllert();
}
