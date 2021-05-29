import { MetaData } from "./meta/MetaData";
import { Person } from "./Person";
import { BloodTest } from "./BloodTest";
import { BloodGroup } from "./bloodGroup";

export class BloodDonate extends MetaData {
    donorId: string | null = null
    donor: Person | null = null
    doctorId: string | null = null
    doctor: Person | null = null

    bloodTestId: string | null = null
    blootest: BloodTest | null = null

    bloodGroupId: string = "00000000-0000-0000-0000-000000000000"
    bloodGroup: BloodGroup | null = null

    amount: string | null = null
    available: boolean = true

    expireDate: string = "0001-01-01T00:00:00"
}