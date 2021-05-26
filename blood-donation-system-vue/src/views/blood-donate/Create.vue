<template>
<h1>Create</h1>

<h4>Blood donation</h4>
<hr/>
<div class="row">
    <div class="col-md-4">
        <div class="form-group">
            <label class="control-label">Donor</label>
            <select class="form-control" v-model="bloodDonate.donorId">
                <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                    {{ patient.fullName }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">Doctor</label>
            <select class="form-control" v-model="bloodDonate.doctorId">
                <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                    {{ doctor.fullName }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">Blood test</label>
            <select class="form-control" v-model="bloodDonate.bloodTestId" >
                <option v-for="bloodTest in bloodTests" :key="bloodTest.id" :value="bloodTest.id" >
                    {{ bloodTest.overviewData }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">Amount</label>
            <input class="form-control" v-model="bloodDonate.amount" />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary" v-on:click="create()">Create</button>
        </div>
    </div>
</div>

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { BloodDonate } from "@/domain/BloodDonate";
import { Person } from "@/domain/Person";
import { BloodTest } from "@/domain/BloodTest";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class BloodDonateCreate extends Vue {
    id!: string;
    bloodDonate: BloodDonate = {
        id: "00000000-0000-0000-0000-000000000000",
        createdBy: "-",
        createAt: "0001-01-01T00:00:00",
        updateBy: "-",
        updatedAt: "0001-01-01T00:00:00",
        donorId: "",
        donor: null,
        doctorId: "",
        doctor: null,
        bloodTestId: "",
        blootest: null,
        bloodGroupId: "00000000-0000-0000-0000-000000000000",
        bloodGroup: null,
        amount: 0,
        available: false,
        expireDate: "0001-01-01T00:00:00",
    }

    patients: Person[] = [];
    doctors: Person[] = [];
    bloodTests: BloodTest[] = [];

    mounted(): void {
        const servicePerson = new BaseService<Person>(
            "Persons",
            store.state.token ? store.state.token : undefined
        );
        servicePerson.getAll(["personType=patient"]).then((data) => {
            this.patients = data.data!;
        });
        servicePerson.getAll(["personType=doctor"]).then((data) => {
            this.doctors = data.data!;
        });

        const serviceBloodGroup = new BaseService<BloodTest>(
            "BloodTest/minimum",
            store.state.token ? store.state.token : undefined
        );
        serviceBloodGroup.getAll().then((data) => {
            this.bloodTests = data.data!;
        });
    }

    create(): void {
        const service = new BaseService<BloodDonate>(
            "BloodDonate",
            store.state.token ? store.state.token : undefined
        );
        console.log(JSON.stringify(this.bloodDonate))
        service.post(this.bloodDonate);
        this.$router.push("/Blooddonate");
    }
}
</script>
