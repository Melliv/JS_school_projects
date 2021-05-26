<template>
    <h1>Blood donations</h1>

    <p>
        <router-link class="nav-link text-dark" to="/Blooddonate/Create">Create new</router-link>
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
                    <router-link :to="'/Blooddonate/details/' + item.id">Details</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { BloodDonate } from "@/domain/BloodDonate";

@Options({
    components: {},
    props: {},
})
export default class BloodDonateIndex extends Vue {
    bloodDonates: BloodDonate[] | null = null;

    get isUserLoggedIn(): boolean {
        return store.state.token != null;
    }

    mounted(): void {
        const service = new BaseService<BloodDonate>(
            "BloodDonate",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.bloodDonates = data.data!;
        });
    }
}
</script>
