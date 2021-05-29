<template>
     <div v-if="alertInfo.message"
        :class="'alert ' + alertInfo.alertClass + ' mt-2'"
        role="alert">
            {{ alertInfo.message }}
    </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { IAlert } from "../types/IAlert";

@Options({
    components: {},
    props: {
        alertInfo: {},
    }
})
export default class Alert extends Vue {
    alertInfo!: IAlert;
}
</script>
