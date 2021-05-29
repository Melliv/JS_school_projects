<template>
    <body id="page-top">
        <div id="wrapper">

            <Sidebar />

            <div id="content-wrapper" class="d-flex flex-column">

                <Header />

                <div class="container-fluid">
                    <div id="content">
                        <div class="container">
                            <main role="main" class="pb-3">
                                <router-view />
                            </main>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />

        </div>
    </body>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

@Options({
    components: {
        Sidebar,
        Header,
        Footer
    },
    props: {},
})
export default class Home extends Vue {

}
</script>
