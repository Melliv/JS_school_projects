import { MetaData } from "@/domain/meta/MetaData";
import { Person } from "@/domain/Person";
import { ContactType } from "@/domain/ContactType";

export class Contact extends MetaData {
    contactValue: string | null = null

    contactTypeId: string | null = null
    contactType: ContactType | null = null

    personId: string | null = null
    person: Person | null = null
}
