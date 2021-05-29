<template>
    <router-view />
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import store from "@/store/index";

export default class App extends Vue {
    mounted(): void {
        if (store.state.token == null) {
            this.$router.push("/Identity/login");
        }
    }
}
</script>
