import { MetaData } from "@/domain/meta/MetaData";
import { Person } from "@/domain/Person";
import { BloodGroup } from "@/domain/bloodGroup";
export class BloodTest extends MetaData {
    allowed: boolean | null = null

    commentsId: string | null = null
    comments: string | null = null

    donorId: string | null = null
    donor: Person | null = null
    doctorId: string | null = null
    doctor: Person | null = null

    bloodGroupId: string | null = null
    bloodGroup: BloodGroup | null = null

    overviewData: string | null = null
}
