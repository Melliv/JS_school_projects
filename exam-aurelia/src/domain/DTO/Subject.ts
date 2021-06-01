import { MetaData } from "../meta/MetaData";
import { AppUser } from "./AppUser";

export class Subject extends MetaData {
    name: string = ""
    description: string = ""
    personId: string = ""
    person: AppUser | null = null
}
