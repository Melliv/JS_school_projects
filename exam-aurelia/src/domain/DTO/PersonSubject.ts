import { MetaData } from "../meta/MetaData";
import { AppUser } from "./AppUser";
import { Subject } from "./Subject";

export class PersonSubject extends MetaData {
    grade: string = ""
    passed: boolean | null = null
    allowed: boolean | null = null
    personId: string = ""
    person: AppUser | null = null
    subjectId: string = ""
    subject: Subject | null = null
}
