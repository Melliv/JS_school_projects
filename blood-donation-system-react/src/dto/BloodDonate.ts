import { MetaData } from "./meta/MetaData";
import { Person } from "./Person";
import { BloodTest } from "./BloodTest";
import { BloodGroup } from "./BloodGroup";

export class BloodDonate extends MetaData {

    donorId: string | null = null
    donor: Person | null = null
    doctorId: string | null = null
    doctor: Person | null = null

    bloodTestId: string | null = null
    blootest: BloodTest | null = null

    bloodGroupId: string | null = null
    bloodGroup: BloodGroup | null = null

    amount: string | null = null
    available: boolean = true

    expireDate: string | null = null

}