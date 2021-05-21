import { MetaData } from "./meta/MetaData";
import { PersonType } from "./PersonType";
import { BloodGroup } from "./BloodGroup";

export class Person extends MetaData {
    firstname: string | null = null
    lastname: string | null = null
    identificationCode: string | null = null
    comments: string | null = null

    personTypeId: string | null = null
    personType: PersonType | null = null

    bloodGroupId: string | null = null
    bloodGroup: BloodGroup | null = null

    fullName: string | null = this.firstname + " " + this.lastname
}