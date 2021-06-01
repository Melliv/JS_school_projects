import { MetaData } from "../meta/MetaData";
import { AppUser } from "./AppUser";
import { Subject } from "./Subject";

export class Homework extends MetaData {
    name: string = ""
    description: string = ""
    dateOfSubmission: string = ""
    maxPoints: string = ""
    personId: string = ""
    person: AppUser | null = null
    subjectId: string = ""
    subject: Subject | null = null
}
