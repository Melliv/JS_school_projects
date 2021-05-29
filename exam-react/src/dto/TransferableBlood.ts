import { MetaData } from "./meta/MetaData";
import { BloodTransfusion } from "./BloodTransfusion";
import { BloodDonate } from "./BloodDonate";

export class TransferableBlood extends MetaData {
    amount: number | null = null

    bloodDonateId: string | null = null
    bloodDonate: BloodDonate | null = null

    bloodTransfusionId: string | null = null
    bloodTransfusion: BloodTransfusion | null = null
}