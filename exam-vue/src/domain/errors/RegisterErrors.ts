import { ErrorAllert } from "@/types/ErrorAller";
import { LoginErrors } from "./LoginErrors";

export class RegisterErrors extends LoginErrors {
    firstname: ErrorAllert = new ErrorAllert();
    lastname: ErrorAllert = new ErrorAllert();
}
