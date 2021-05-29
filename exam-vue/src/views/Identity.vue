<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">

                        <div v-if="token" class="container">
                            <a type="button" class="btn btn-primary"
                                >Home
                            </a>
                        </div>

                        <div class="container m-auto">
                            <main role="main" class="pb-3">
                                <router-view />
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Home from "@/views/Home.vue";
import store from "../store/index";

@Options({
    // Do not forget to register imported components!!!!!
    components: {
        Home,
    },
})
export default class Identity extends Vue {
    token: string | null = store.state.token;
}
</script>
<style>
</style>
