import { MetaData } from "../meta/MetaData";
import { AppUser } from "./AppUser";
import { Homework } from "./Homework";

export class PersonHomework extends MetaData {
    grade: string = ""
    points: string = ""
    personId: string = ""
    person: AppUser | null = null
    homeworkId: string = ""
    homework: Homework | null = null
}
