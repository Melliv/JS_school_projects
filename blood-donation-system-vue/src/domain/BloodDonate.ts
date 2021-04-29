import { MetaData } from "@/domain/meta/MetaData";
import { Person } from "@/domain/Person";
import { BloodTest } from "@/domain/BloodTest";
import { BloodGroup } from "@/domain/bloodGroup";

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