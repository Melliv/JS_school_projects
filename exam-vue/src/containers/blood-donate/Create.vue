<template>
<h1>Create</h1>

<h4>Blood donation</h4>
<hr/>
<div class="row">
    <div class="col-md-4">
        <Alert :alertInfo="errors.generalError" />
        <div class="form-group">
            <label class="control-label">Donor</label>
            <select class="form-control" v-model="bloodDonate.donorId" >
                <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                    {{ patient.fullName }}
                </option>
            </select>
            <Alert :alertInfo="errors.donor" />
        </div>
        <div class="form-group">
            <label class="control-label">Doctor</label>
            <select class="form-control" v-model="bloodDonate.doctorId">
                <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                    {{ doctor.fullName }}
                </option>
            </select>
            <Alert :alertInfo="errors.doctor" />
        </div>
        <div class="form-group">
            <label class="control-label">Blood test</label>
            <select class="form-control" v-model="bloodDonate.bloodTestId" >
                <option v-for="bloodTest in bloodTests" :key="bloodTest.id" :value="bloodTest.id" >
                    {{ bloodTest.overviewData }}
                </option>
            </select>
            <Alert :alertInfo="errors.bloodTest" />
        </div>
        <div class="form-group">
            <label class="control-label">Amount</label>
            <input class="form-control" v-model="bloodDonate.amount" />
            <Alert :alertInfo="errors.amount" />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary" v-on:click="create()">Create</button>
        </div>
        <Loader :pageLoader="pageLoader" />
    </div>
</div>

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { BloodDonate } from "@/domain/DTO/BloodDonate";
import { Person } from "@/domain/DTO/Person";
import { BloodTest } from "@/domain/DTO/BloodTest";
import { BloodDonateErrors } from "@/domain/errors/BloodDonateErrors";
import { EPageStatus } from "@/types/EPageStatus";
import { PageLoader } from "@/types/PageLoader";
import Loader from "@/components/Loader.vue";
import Alert from "@/components/Alert.vue";

@Options({
    components: {
        Loader,
        Alert
    },
    props: {
    },
})
export default class BloodDonateCreate extends Vue {
    errors: BloodDonateErrors = new BloodDonateErrors();
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    bloodDonate: BloodDonate = new BloodDonate();
    patients: Person[] = [];
    doctors: Person[] = [];
    bloodTests: BloodTest[] = [];

    async mounted(): Promise<void> {
        const resultPatients = await BaseService.getAll<Person>("/Persons", store.state.token as string);
        const resultDoctors = await BaseService.getAll<Person>("/Persons/personType=doctor", store.state.token as string);
        const resultBloodTests = await BaseService.getAll<BloodTest>("/BloodTest/minimum", store.state.token as string);

        if (resultPatients.ok && resultPatients.data &&
            resultDoctors.ok && resultDoctors.data &&
            resultBloodTests.ok && resultBloodTests.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }

            this.patients = resultPatients.data as Person[];
            this.doctors = resultDoctors.data as Person[];
            this.bloodTests = resultBloodTests.data as BloodTest[];
        } else {
            this.pageLoader = {
                pageStatus: EPageStatus.Error,
                statusCode: (!resultPatients.ok ? resultPatients
                    : !resultDoctors.ok ? resultDoctors
                        : resultBloodTests).statusCode
            }
        }
    }

    async create(): Promise<void> {
        if (!this.handleValidation()) {
            return;
        }

        const response = await BaseService.post("BloodDonate", this.bloodDonate, store.state.token as string);
        if (response.ok != null && response.messages != null) {
            this.errors.generalError.message = response.messages
        } else if (response.data != null) {
            this.$router.push("/Blooddonate/" + response.data.id);
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new BloodDonateErrors();

        if (!this.bloodDonate.amount || this.bloodDonate.amount === "0") {
            this.errors.amount.message = "Amount can not be 0!";
            formIsValid = false;
        }

        if (!this.bloodDonate.donorId) {
            this.errors.donor.message = "Donor field can not be empty!";
            formIsValid = false;
        }

        if (!this.bloodDonate.doctorId) {
            this.errors.doctor.message = "Doctor field can not be empty!";
            formIsValid = false;
        }

        if (!this.bloodDonate.bloodTestId) {
            this.errors.bloodTest.message = "bloodTest field can not be empty!";
            formIsValid = false;
        }

        return formIsValid;
    }
}
</script>
