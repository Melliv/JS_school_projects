import { ErrorAllert } from "@/types/ErrorAller";
import { MetaErrorInfo } from "./MetaErrorInfo";

export class LoginErrors extends MetaErrorInfo {
    email: ErrorAllert = new ErrorAllert();
    password: ErrorAllert = new ErrorAllert();
}
