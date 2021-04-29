import { MetaData } from "@/domain/meta/MetaData";
import { Person } from "@/domain/Person";
import { ContactType } from "@/domain/ContactType";

export class Contact extends MetaData {
    contactValue: String | null = null

    contactTypeId: String | null = null
    contactType: ContactType | null = null

    personId: String | null = null
    person: Person | null = null
}