<template>
    <div>Hello, {{name}}</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
    components: {},
    props: {
        name: String,
    }
})
export default class greeting extends Vue {
    name!: string;
}
</script>
