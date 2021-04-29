<template>
<h1>Create</h1>

<h4>Blood test</h4>
<hr/>
<div class="row">
    <div class="col-md-4">
        <div class="form-group">
            <label class="control-label">Doctor</label>
            <select class="form-control" v-model="bloodTest.doctorId">
                <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                    {{ doctor.fullName }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">Donor</label>
            <select class="form-control" v-model="bloodTest.donorId">
                <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                    {{ patient.fullName }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">blood group</label>
            <select class="form-control" v-model="bloodTest.bloodGroupId">
                <option v-for="bloodGroup in bloodGroups" :key="bloodGroup.id" :value="bloodGroup.id">
                    {{ bloodGroup.bloodGroupValue }}
                </option>
            </select>
        </div>
        <div class="form-group col-3">
            <label class="control-label">Allowed</label>
            <input class="form-control" type="checkbox" v-model="bloodTest.allowed" />
        </div>
        <div class="form-group">
            <label class="control-label">Comments</label>
            <textarea rows="5" class="form-control" v-model="bloodTest.comments" ></textarea>
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
import { BloodTest } from "@/domain/BloodTest";
import { Person } from "@/domain/Person";
import { BloodGroup } from "@/domain/BloodGroup";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class BloodTestCreate extends Vue {
    bloodTest: BloodTest = {
        id: "00000000-0000-0000-0000-000000000000",
        createdBy: "-",
        createAt: "0001-01-01T00:00:00",
        updateBy: "-",
        updatedAt: "0001-01-01T00:00:00",
        allowed: false,
        commentsId: "00000000-0000-0000-0000-000000000000",
        comments: "",
        donorId: "",
        donor: null,
        doctorId: "",
        doctor: null,
        bloodGroupId: "",
        bloodGroup: null,
        overviewData: ""
    }

    patients: Person[] = [];
    doctors: Person[] = [];
    bloodGroups: BloodGroup[] = [];

    mounted(): void {
        const servicePerson = new BaseService<Person>(
            "https://localhost:5051/api/v1/Persons",
            store.state.token ? store.state.token : undefined
        );
        servicePerson.getAll(["personType=patient"]).then((data) => {
            this.patients = data.data!;
        });
        servicePerson.getAll(["personType=doctor"]).then((data) => {
            this.doctors = data.data!;
        });

        const serviceBloodGroup = new BaseService<BloodGroup>(
            "https://localhost:5051/api/v1/BloodGroup",
            store.state.token ? store.state.token : undefined
        );
        serviceBloodGroup.getAll().then((data) => {
            this.bloodGroups = data.data!;
        });
    }

    create(): void {
        const service = new BaseService<BloodTest>(
            "https://localhost:5051/api/v1/BloodTest",
            store.state.token ? store.state.token : undefined
        );
        service.post(this.bloodTest);
        this.$router.push("/BloodTest");
    }
}
</script>
