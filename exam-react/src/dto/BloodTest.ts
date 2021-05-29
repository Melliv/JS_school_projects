import { MetaData } from "./meta/MetaData";
import { Person } from "./Person";
import { BloodGroup } from "./BloodGroup";
export class BloodTest extends MetaData {
    allowed: boolean | null = null
    comments: string | null = null

    donorId: string | null = null
    donor: Person | null = null
    doctorId: string | null = null
    doctor: Person | null = null

    bloodGroupId: string | null = null
    bloodGroup: BloodGroup | null = null

    overviewData: string | null = null
}