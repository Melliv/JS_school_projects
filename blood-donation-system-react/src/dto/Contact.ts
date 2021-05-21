import { MetaData } from "./meta/MetaData";
import { Person } from "./Person";
import { ContactType } from "./ContactType";

export class Contact extends MetaData {
    contactValue: string | null = null

    contactTypeId: string | null = null
    contactType: ContactType | null = null

    personId: string | null = null
    person: Person | null = null
}