<template>
    <Alert :alertInfo="errors.generalError" />
    <div class="row">
        <div class="col-md-4">
            <h4>Create new account</h4>
            <hr />
            <div class="form-group">
                <label>Email</label>
                <input v-model="registerDTO.email" :maxLength="100" class="form-control" id="email"/>
                <Alert :alertInfo="errors.email" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="registerDTO.password" :maxLength="100" class="form-control" type="password" id="password"/>
                <Alert :alertInfo="errors.password" />
            </div>
            <div class="form-group">
                <label>Confirme password</label>
                <input v-model="confirmPassword" :maxLength="100" class="form-control" type="password" id="confirmPassword"/>
            </div>
            <div class="form-group">
                <label>Firstname</label>
                <input v-model="registerDTO.firstname" :maxLength="128" class="form-control" id="firstname"/>
                <Alert :alertInfo="errors.firstname" />
            </div>
            <div class="form-group">
                <label>Lastname</label>
                <input v-model="registerDTO.lastname" :maxLength="128" class="form-control" id="lastname"/>
                <Alert :alertInfo="errors.lastname" />
            </div>
            <button @click="registerClicked()" type="submit" class="btn btn-primary">
                Register
            </button>
            <router-link class="ml-2" to="/Identity/Login">
                Login
            </router-link>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { IdentityService } from "@/services/identity-service";
import Alert from "@/components/Alert.vue";
import { RegisterErrors } from "@/domain/errors/RegisterErrors";
import { Register as RegisterDTO } from "@/domain/DTO/Register";

@Options({
    components: {
        Alert
    },
    props: {},
})
export default class Register extends Vue {
    errors: RegisterErrors = new RegisterErrors();
    registerDTO: RegisterDTO = new RegisterDTO();
    confirmPassword: string = "";

    async registerClicked(): Promise<void> {
        if (!this.handleValidation()) {
            return;
        }

        const response = await IdentityService.Register('/Account/Register', this.registerDTO);
        if (!response.ok && response.messages != null) {
            this.errors.generalError.message = response.messages
        } else {
            store.commit("logIn", response.data);
            this.$router.push("/");
        }
    }

    handleValidation(): boolean {
        let formIsValid = true;

        this.errors = new RegisterErrors();

        const emailRe = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;
        if (!emailRe.test(this.registerDTO.email)) {
            this.errors.email.message = "Email is not valid!"
            formIsValid = false;
        }

        const passwordRe = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i;
        if (!passwordRe.test(this.registerDTO.password)) {
            this.errors.password.message = "Password requirements: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character:"
            formIsValid = false;
        }

        if (this.registerDTO.password !== this.confirmPassword) {
            this.errors.password.message = "Password and confirm password are not the same!";
            formIsValid = false;
        }

        if (!this.registerDTO.firstname) {
            this.errors.firstname.message = "Firstname field can not be empty!"
            formIsValid = false;
        }

        if (!this.registerDTO.lastname) {
            this.errors.lastname.message = "Lastname field can not be empty!"
            formIsValid = false;
        }

        return formIsValid;
    }
}
</script>
