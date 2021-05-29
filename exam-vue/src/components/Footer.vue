<template>
    <footer class="footer bg-dark text-center text-lg-start text-light">
        <div class="container">
            2021
            <router-link class="text-info" to="/privacy">
                Privacy
            </router-link>
        </div>
    </footer>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {},
    props: {},
})
export default class Footer extends Vue {}
</script>
