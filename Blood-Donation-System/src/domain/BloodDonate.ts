import { MetaData } from "./meta/MetaData";
import { Person } from "./Person";
import { BloodTest } from "./BloodTest";
import { BloodGroup } from "./bloodGroup";

export class BloodDonate extends MetaData {

    donorId: String | null = null
    donor: Person | null = null
    doctorId: String | null = null
    doctor: Person | null = null

    bloodTestId: String | null = null
    blootest: BloodTest | null = null

    bloodGroupId: String | null = null
    bloodGroup: BloodGroup | null = null

    amount: number | null = null
    available: boolean = true

    expireDate: String | null = null

}