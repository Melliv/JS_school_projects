<template>
<h1>Create</h1>

<h4>Blood transfusion</h4>
<hr/>
<div class="row">
    <div class="col-md-4">
        <div class="form-group">
            <label class="control-label">Amount</label>
            <input class="form-control" v-model="bloodTransfusion.amount" />
        </div>
        <div class="form-group">
            <label class="control-label">Patient</label>
            <select class="form-control" v-model="bloodTransfusion.donorId">
                <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                    {{ patient.fullName }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">Doctor</label>
            <select class="form-control" v-model="bloodTransfusion.doctorId">
                <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                    {{ doctor.fullName }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">Blood group</label>
            <select class="form-control" v-model="bloodTransfusion.bloodGroupId" >
                <option v-for="bloodGroup in bloodGroups" :key="bloodGroup.id" :value="bloodGroup.id" >
                    {{ bloodGroup.bloodGroupValue }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">Comments</label>
            <textarea rows="5" class="form-control" v-model="bloodTransfusion.comments" ></textarea>
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
import { BloodTransfusion } from "@/domain/BloodTransfusion";
import { Person } from "@/domain/Person";
import { BloodGroup } from "@/domain/BloodGroup";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class BloodTransfusionCreate extends Vue {
    id!: string;
    bloodTransfusion: BloodTransfusion = {
        id: "00000000-0000-0000-0000-000000000000",
        createdBy: "-",
        createAt: "0001-01-01T00:00:00",
        updateBy: "-",
        updatedAt: "0001-01-01T00:00:00",
        amount: 0,
        commentsId: "00000000-0000-0000-0000-000000000000",
        comments: "",
        donorId: "",
        donor: null,
        doctorId: "",
        doctor: null,
        bloodGroupId: "",
        bloodGroup: null
    }

    patients: Person[] = [];
    doctors: Person[] = [];
    bloodGroups: BloodGroup[] = [];
    value: number = -1;

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

        const serviceBloodGroup = new BaseService<BloodGroup>(
            "BloodGroup",
            store.state.token ? store.state.token : undefined
        );
        serviceBloodGroup.getAll().then((data) => {
            this.bloodGroups = data.data!;
        });
    }

    create(): void {
        const service = new BaseService<BloodTransfusion>(
            "BloodTransfusion",
            store.state.token ? store.state.token : undefined
        );
        service.post(this.bloodTransfusion);
        this.$router.push("/BloodTransfusion");
    }
}
</script>
