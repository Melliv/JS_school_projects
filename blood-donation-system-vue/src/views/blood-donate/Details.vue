<template>

<h1>Details</h1>

<div>
    <h4>Blood donate</h4>
    <hr />
    <div v-if="bloodDonate != null">
        <dl class="row">
            <dt class = "col-sm-2">
                Blood group
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.bloodGroup.bloodGroupValue }}
            </dd>
            <dt class = "col-sm-2">
                Amount
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.amount }}
            </dd>
            <dt class = "col-sm-2">
                Available
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.available }}
            </dd>
            <dt class = "col-sm-2">
                Donor
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.donor.fullName }}
            </dd>
            <dt class = "col-sm-2">
                Doctor
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.doctor.fullName }}
            </dd>
            <dt class = "col-sm-2">
                Expire date
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.expireDate }}
            </dd>
            <dt class = "col-sm-2">
                Created by
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.createdBy }}
            </dd>
            <dt class = "col-sm-2">
                Create at
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.createAt }}
            </dd>
            <dt class = "col-sm-2">
                Update by
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.updateBy }}
            </dd>
            <dt class = "col-sm-2">
                Updated at
            </dt>
            <dd class = "col-sm-10">
                {{ bloodDonate.updatedAt }}
            </dd>
        </dl>
    </div>
</div>
<div>
    <router-link class="nav-link text-dark" to="/blooddonate/">to list</router-link>
</div>

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { BloodDonate } from "@/domain/BloodDonate";

@Options({
    components: {},
    props: {
        id: String,
    },
})
export default class BloodDonateDetails extends Vue {
    id!: string;
    bloodDonate: BloodDonate | null = null

    mounted(): void {
        const service = new BaseService<BloodDonate>(
            "BloodDonate",
            store.state.token ? store.state.token : undefined
        );

        service.get([this.id]).then((data) => {
            this.bloodDonate = data.data!;
        });
    }
}
</script>
