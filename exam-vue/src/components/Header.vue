<template>
    <header class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse collapse d-flex justify-content-end">
            <ul class="navbar-nav float-right">
                <li class="nav-item" v-if="!token">
                    <router-link
                        to="/identity/login"
                        class="nav-link text-dark"
                        >Login</router-link
                    >
                </li>

                <li class="nav-item" v-if="token" >
                    <a
                        href="#"
                        class="nav-link text-dark"
                        @click="logOut()"
                        >Logout
                    </a>
                </li>
            </ul>
        </div>
    </header>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";

@Options({
    components: {},
    props: {},
})
export default class Header extends Vue {
    get token(): string | null {
        return store.state.token;
    }

    logOut(): void {
        store.commit("logOut");
        this.$router.push("/Identity/login");
    }
}
</script>
