import { ErrorAlert } from "../../types/ErrorAlert";
import { LoginErrors } from "./LoginErrors";

export class RegisterErrors extends LoginErrors {
    firstname: ErrorAlert = new ErrorAlert();
    lastname: ErrorAlert = new ErrorAlert();
}
