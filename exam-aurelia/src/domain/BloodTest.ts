import { MetaData } from "./meta/MetaData";
import { Person } from "./Person";
import { BloodGroup } from "./bloodGroup";
export class BloodTest extends MetaData {

    allowed: boolean | null = null

    commentsId: String | null = null
    comments: String | null = null

    donorId: String | null = null
    donor: Person | null = null
    doctorId: String | null = null
    doctor: Person | null = null

    bloodGroupId: String | null = null
    bloodGroup: BloodGroup | null = null

    overviewData: String | null = null
}