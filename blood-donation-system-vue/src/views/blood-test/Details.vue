<template>

<h1>Details</h1>

<div>
    <h4>Blood test</h4>
    <hr />
    <div v-if="bloodTest != null" >
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
    bloodTest: BloodTest | null = null
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
