import { MetaData } from "@/domain/meta/MetaData";
import { Person } from "@/domain/Person";
import { BloodGroup } from "@/domain/bloodGroup";
export class BloodTransfusion extends MetaData {
    amount: number | null = null
    commentsId: String | null = null
    comments: String | null = null

    donorId: String | null = null
    donor: Person | null = null
    doctorId: String | null = null
    doctor: Person | null = null

    bloodGroupId: String | null = null
    bloodGroup: BloodGroup | null = null
}