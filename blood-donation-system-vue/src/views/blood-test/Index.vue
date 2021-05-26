<template>
        <h1>Blood tests</h1>

    <p>
        <router-link class="nav-link text-dark" to="/bloodtest/Create">Create new</router-link>
    </p>

    <table class="table">
        <thead>
            <tr>
                <th>Allowed</th>
                <th>Donor</th>
                <th>Doctor</th>
                <th>Created at</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in bloodTests" :key="item.id">
                <td>{{ item.allowed }}</td>
                <td>{{ item.donor.fullName }}</td>
                <td>{{ item.doctor.fullName }}</td>
                <td>{{ item.createAt }}</td>
                <td>
                    <router-link :to="'/bloodtest/details/' + item.id">Details</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { BloodTest } from "@/domain/BloodTest";

@Options({
    components: {},
    props: {},
})
export default class BloodTestIndex extends Vue {
    bloodTests: BloodTest[] | null = null;

    get isUserLoggedIn(): boolean {
        return store.state.token != null;
    }

    mounted(): void {
        const service = new BaseService<BloodTest>(
            "BloodTest",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.bloodTests = data.data!;
        });
    }
}
</script>
