<template>
    <router-view />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Home from "@/views/Home.vue";
import store from "@/store/index";

@Options({
    // Do not forget to register imported components!!!!!
    components: {
        Home
    },
})
export default class App extends Vue {
    mounted(): void {
        if (store.state.token == null) {
            this.$router.push("/identity");
        }
    }
}
</script>

<style>
@import './assets/css/sb.admin-2.min.css';
@import './assets/css/site.css';
</style>
