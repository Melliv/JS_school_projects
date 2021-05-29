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
<Loader :pageLoader="pageLoader" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { BloodDonate } from "@/domain/DTO/BloodDonate";
import { EPageStatus } from "@/types/EPageStatus";
import { PageLoader } from "@/types/PageLoader";
import Loader from "@/components/Loader.vue";

@Options({
    components: {
        Loader
    },
    props: {
        id: String,
    },
})
export default class BloodDonateDetails extends Vue {
    id!: string;
    bloodDonate?: BloodDonate;
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    async mounted(): Promise<void> {
        const result = await BaseService.get<BloodDonate>("/BloodDonate/" + this.id, store.state.token as string);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 }

            this.bloodDonate = result.data as BloodDonate;
        } else {
            this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode }
        }
    }
}
</script>
