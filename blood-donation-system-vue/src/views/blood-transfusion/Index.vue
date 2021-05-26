<template>
        <h1>Blood transfusions</h1>

    <p>
        <router-link class="nav-link text-dark" to="/bloodtransfusion/Create">Create new</router-link>
    </p>

    <table class="table">
        <thead>
            <tr>
                <th>Amount</th>
                <th>Blood group</th>
                <th>Donor</th>
                <th>Doctor</th>
                <th>Created at</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in bloodTransfusions" :key="item.id">
                <td>{{ item.amount }}</td>
                <td>{{ item.bloodGroup.bloodGroupValue }}</td>
                <td>{{ item.donor.fullName }}</td>
                <td>{{ item.doctor.fullName }}</td>
                <td>{{ item.createAt }}</td>
                <td>
                    <router-link :to="'/bloodtransfusion/details/' + item.id">Details</router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { BaseService } from "@/services/base-service";
import { BloodTransfusion } from "@/domain/BloodTransfusion";
import { getJSON } from "node_modules/@types/jquery";

@Options({
    components: {},
    props: {},
})
export default class BloodTransfusionIndex extends Vue {
    bloodTransfusions: BloodTransfusion[] | null = null;

    get isUserLoggedIn(): boolean {
        return store.state.token != null;
    }

    mounted(): void {
        const service = new BaseService<BloodTransfusion>(
            "BloodTransfusion",
            store.state.token ? store.state.token : undefined
        );
        service.getAll().then((data) => {
            this.bloodTransfusions = data.data!;
        });
    }
}
</script>
