import { MetaData } from "./meta/MetaData";
import { Person } from "./Person";
import { ContactType } from "./ContactType";

export class Contact extends MetaData {
    contactValue: String | null = null

    contactTypeId: String | null = null
    contactType: ContactType | null = null

    personId: String | null = null
    person: Person | null = null
}