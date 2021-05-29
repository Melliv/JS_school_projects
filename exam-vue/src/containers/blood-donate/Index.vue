<template>
    <h1>Blood donations</h1>

    <p>
        <router-link class="nav-link text-dark" to="/Blooddonate/Create">
            Create new
        </router-link>
    </p>

    <table class="table">
        <thead>
            <tr>
                <th>Blood group</th>
                <th>Amount</th>
                <th>Donor</th>
                <th>Doctor</th>
                <th>Created at</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in bloodDonates" :key="item.id">
                <td>{{ item.bloodGroup.bloodGroupValue }}</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.donor.fullName }}</td>
                <td>{{ item.doctor.fullName }}</td>
                <td>{{ item.createAt }}</td>
                <td>
                    <router-link :to="'/Blooddonate/' + item.id">
                        Details
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
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
    props: {},
})
export default class BloodDonateIndex extends Vue {
    bloodDonates?: BloodDonate[];
    pageLoader: PageLoader = { pageStatus: EPageStatus.Loading, statusCode: -1 };

    async mounted(): Promise<void> {
        const result = await BaseService.getAll<BloodDonate>("/BloodDonate", store.state.token as string);

        if (result.ok && result.data) {
            this.pageLoader = { pageStatus: EPageStatus.OK, statusCode: 0 };

            this.bloodDonates = result.data as BloodDonate[];
        } else {
            this.pageLoader = { pageStatus: EPageStatus.Error, statusCode: result.statusCode };
        }
    }
}
</script>
