<template>

<h1>Details</h1>

<div>
    <h4>Blood transfusion</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            Allowed
        </dt>
        <dd class = "col-sm-10">
            {{ bloodTest.allowed }}
        </dd>
        <dt class = "col-sm-2">
            Blood group
        </dt>
        <dd class = "col-sm-10">
            {{ bloodTest.bloodGroup.bloodGroupValue }}
        </dd>
        <dt class = "col-sm-2">
            Donor
        </dt>
        <dd class = "col-sm-10">
            {{ bloodTest.donor.fullName }}
        </dd>
        <dt class = "col-sm-2">
            Doctor
        </dt>
        <dd class = "col-sm-10">
            {{ bloodTest.doctor.fullName }}
        </dd>
        <dt class = "col-sm-2">
            Comments
        </dt>
        <dd class = "col-sm-10">
            {{ bloodTest.comments }}
        </dd>
        <dt class = "col-sm-2">
            Created by
        </dt>
        <dd class = "col-sm-10">
            {{ bloodTest.createdBy }}
        </dd>
        <dt class = "col-sm-2">
            Create at
        </dt>
        <dd class = "col-sm-10">
            {{ bloodTest.createAt }}
        </dd>
        <dt class = "col-sm-2">
            Update by
        </dt>
        <dd class = "col-sm-10">
            {{ bloodTest.updateBy }}
        </dd>
        <dt class = "col-sm-2">
            Updated at
        </dt>
        <dd class = "col-sm-10">
            {{ bloodTest.updatedAt }}
        </dd>
    </dl>
</div>
<div>
    <router-link class="nav-link text-dark" to="/bloodtest/">to list</router-link>
</div>

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { BloodTest } from "@/domain/BloodTest";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class BloodTestDetails extends Vue {
    id!: string;
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
        donor: {
            id: "00000000-0000-0000-0000-000000000000",
            createdBy: "-",
            createAt: "",
            updateBy: "-",
            updatedAt: "",
            firstname: null,
            lastname: null,
            identificationCode: null,
            commentsId: "00000000-0000-0000-0000-000000000000",
            comments: null,
            personTypeId: "00000000-0000-0000-0000-000000000000",
            personType: null,
            bloodGroupId: "00000000-0000-0000-0000-000000000000",
            bloodGroup: null,
            fullName: "",
        },
        doctorId: "",
        doctor: {
            id: "00000000-0000-0000-0000-000000000000",
            createdBy: "-",
            createAt: "",
            updateBy: "-",
            updatedAt: "",
            firstname: null,
            lastname: null,
            identificationCode: null,
            commentsId: "00000000-0000-0000-0000-000000000000",
            comments: null,
            personTypeId: "00000000-0000-0000-0000-000000000000",
            personType: null,
            bloodGroupId: "00000000-0000-0000-0000-000000000000",
            bloodGroup: null,
            fullName: "",
        },
        bloodGroupId: "00000000-0000-0000-0000-000000000000",
        bloodGroup: {
            id: "00000000-0000-0000-0000-000000000000",
            createdBy: "-",
            createAt: "",
            updateBy: "-",
            updatedAt: "",
            bloodGroupValue: null
        },
        overviewData: ""
    }

    mounted(): void {
        const service = new BaseService<BloodTest>(
            "https://localhost:5051/api/v1/BloodTest",
            store.state.token ? store.state.token : undefined
        );

        service.get([this.id]).then((data) => {
            this.bloodTest = data.data!;
        });
    }
}
</script>
