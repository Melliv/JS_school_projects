import { MetaData } from "@/domain/meta/MetaData";
import { PersonType } from "@/domain/PersonType";
import { BloodGroup } from "@/domain/BloodGroup";

export class Person extends MetaData {
    firstname: String | null = null
    lastname: String | null = null
    identificationCode: String | null = null
    commentsId: String | null = null
    comments: String | null = null

    personTypeId: String | null = null
    personType: PersonType | null = null

    bloodGroupId: String | null = null
    bloodGroup: BloodGroup | null = null

    fullName: String | null = this.firstname + " " + this.lastname
}