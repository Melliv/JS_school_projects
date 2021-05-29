<template>
    <div class="row">
        <div class="col-sm-1 col-md-3"></div>
        <div class="col-sm-10 col-md-6">
            <h4>Use a local account to log in.</h4>
            <hr />
            <Alert :alertInfo="errors.generalError" />
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input
                    class="form-control"
                    type="email"
                    id="Input_Email"
                    v-model="email"
                />
                <Alert :alertInfo="errors.email" />
            </div>
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input
                    class="form-control"
                    type="password"
                    id="Input_Password"
                    v-model="password"
                />
                <Alert :alertInfo="errors.password" />
            </div>
            <div class="form-group">
                <button
                    @click="loginClicked()"
                    type="submit"
                    class="btn btn-primary"
                >
                    Log in
                </button>
                <router-link class="ml-2" to="/Identity/Register">
                    Register
                </router-link>
            </div>
        </div>
        <div class="col-sm-1 col-md-3"></div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { IdentityService } from "@/services/identity-service";
import { LoginErrors } from "@/domain/errors/LoginErrors";
import Alert from "@/components/Alert.vue";

@Options({
    components: {
        Alert
    },
    props: {},
})
export default class Login extends Vue {
    errors: LoginErrors = new LoginErrors();
    email: string = "admin@bloody.ee";
    password: string = "Foo.bar1";

    async loginClicked(): Promise<void> {
        if (!this.handleValidation()) {
            return;
        }

        const response = await IdentityService.Login('/Account/Login', { email: this.email, password: this.password });
        if (!response.ok) {
            this.errors.generalError.message = response.messages ? response.messages : response.statusCode.toString();
        } else {
            store.commit("logIn", response.data);
            this.$router.push("/");
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new LoginErrors();

        if (!this.email) {
            this.errors.email.message = "Empty email!";
            formIsValid = false;
        }

        if (!this.password) {
            this.errors.password.message = "Empty password!";
            formIsValid = false;
        }

        return formIsValid;
    }
}
</script>
