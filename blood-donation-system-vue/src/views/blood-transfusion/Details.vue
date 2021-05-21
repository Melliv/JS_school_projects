<template>

<h1>Details</h1>

<div>
    <h4>Blood transfusion</h4>
    <hr />
    <div v-if="bloodTransfusion != null">
        <dl class="row">
            <dt class = "col-sm-2">Amount</dt>
            <dd class = "col-sm-10">
                {{ bloodTransfusion.amount }}
            </dd>
            <dt class = "col-sm-2">
                Blood group
            </dt>
            <dd class = "col-sm-10">
                {{ bloodTransfusion.bloodGroup.bloodGroupValue }}
            </dd>
            <dt class = "col-sm-2">
                Donor
            </dt>
            <dd class = "col-sm-10">
                {{ bloodTransfusion.donor.fullName }}
            </dd>
            <dt class = "col-sm-2">
                Doctor
            </dt>
            <dd class = "col-sm-10">
                {{ bloodTransfusion.doctor.fullName }}
            </dd>
            <dt class = "col-sm-2">
                Comments
            </dt>
            <dd class = "col-sm-10">
                {{ bloodTransfusion.comments }}
            </dd>
            <dt class = "col-sm-2">
                Created by
            </dt>
            <dd class = "col-sm-10">
                {{ bloodTransfusion.createdBy }}
            </dd>
            <dt class = "col-sm-2">
                Create at
            </dt>
            <dd class = "col-sm-10">
                {{ bloodTransfusion.createAt }}
            </dd>
            <dt class = "col-sm-2">
                Update by
            </dt>
            <dd class = "col-sm-10">
                {{ bloodTransfusion.updateBy }}
            </dd>
            <dt class = "col-sm-2">
                Updated at
            </dt>
            <dd class = "col-sm-10">
                {{ bloodTransfusion.updatedAt }}
            </dd>
        </dl>
    </div>
</div>
<div>
    <router-link class="nav-link text-dark" to="/bloodtransfusion/">to list</router-link>
</div>

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { BloodTransfusion } from "@/domain/BloodTransfusion";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class BloodTransfusionDetails extends Vue {
    id!: string;
    bloodTransfusion: BloodTransfusion | null = null

    mounted(): void {
        const service = new BaseService<BloodTransfusion>(
            "https://localhost:5051/api/v1/BloodTransfusion",
            store.state.token ? store.state.token : undefined
        );

        service.get([this.id]).then((data) => {
            this.bloodTransfusion = data.data!;
        });
    }
}
</script>
