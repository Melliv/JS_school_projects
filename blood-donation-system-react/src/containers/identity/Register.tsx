import { useContext, useState } from "react";
import { Redirect } from "react-router";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { IdentityService } from "../../services/identity-service";

const Register = () => {
    const validationTemplate = {
        "error": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
        "firstname": "",
        "lastname": ""
    }

    const appState = useContext(AppContext);

    const [registerData, setFormValues] = useState({
         email: '',
         password: '',
         confirmPassword: '',
         firstname: '',
         lastname: ''});

    const [alertMessage, setAlertMessage] = useState(validationTemplate);

    const handleValidation = () => {
        let formIsValid = true;

        setAlertMessage(validationTemplate);

        const emailRe = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;

        if(!emailRe.test(registerData.email)){
            setAlertMessage(prevState => ({
                ...prevState,
                "email": "Email is not valid!"
            }));
            formIsValid = false;
        }

        const passwordRe = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i;

        if(!passwordRe.test(registerData.password)) {
            setAlertMessage(prevState => ({
                ...prevState,
                "password": "Password requirements: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character:"
            }));
            formIsValid = false;
        }
        if(registerData.password.length > 100) {
            setAlertMessage(prevState => ({
                ...prevState,
                "password": "Password to long!"
            }));
            formIsValid = false;
        }

        if(registerData.password !== registerData.confirmPassword) {
            setAlertMessage(prevState => ({
                ...prevState,
                "password": "Password and confirm password are not the same!"
            }));
            formIsValid = false;
        }

        if(registerData.firstname === "") {
            setAlertMessage(prevState => ({
                ...prevState,
                "firstname": "Firstname field can not be empty!"
            }));
            formIsValid = false;
        }
        if(registerData.firstname.length > 128) {
            setAlertMessage(prevState => ({
                ...prevState,
                "password": "Firstname to long!"
            }));
            formIsValid = false;
        }

        if(registerData.lastname === "") {
            setAlertMessage(prevState => ({
                ...prevState,
                "lastname": "Lastname field can not be empty!"
            }));
            formIsValid = false;
        }
        if(registerData.lastname.length > 128) {
            setAlertMessage(prevState => ({
                ...prevState,
                "password": "Lastname to long!"
            }));
            formIsValid = false;
        }

       return formIsValid;
   }

    const registerClicked = async (e: Event) => {
        e.preventDefault();

        console.log("hello");
        if (!handleValidation()) {
            return;
        };

        const registerDTO = {
            email: registerData.email,
            password: registerData.password,
            firstname: registerData.firstname,
            lastname: registerData.lastname,
        }

        let response = await IdentityService.Register('account/register', registerDTO);
        if (!response.ok) {
            setAlertMessage(prevState => ({
                ...prevState,
                "error": response.messages!
            }));
        } else {
            appState.setAuthInfo(response.data!.token, response.data!.firstname, response.data!.lastname);
        }
    }

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        switch (target.id) {
            case 'email':
                setFormValues({ ...registerData, email: target.value });
                return
            case 'password':
                setFormValues({ ...registerData, password: target.value });
                return
            case 'confirmPassword':
                setFormValues({ ...registerData, confirmPassword: target.value });
                return
            case 'firstname':
                setFormValues({ ...registerData, firstname: target.value });
                return
            case 'lastname':
                setFormValues({ ...registerData, lastname: target.value });
                return
        }
    }

    return (
        <>
            { appState.token !== null ? <Redirect to="/" /> : null}
            <Alert show={alertMessage.error !== ''} message={alertMessage.error} alertClass={EAlertClass.Danger} />
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={(e) => registerClicked(e.nativeEvent)}>
                        <h4>Create new account</h4>
                        <hr />
                        <div className="form-group">
                            <label asp-for="Input.Email">Email</label>
                            <input value={registerData.email} onChange={(e) => handleChange(e.target)} className="form-control" id="email"/>
                            <Alert show={alertMessage.email !== ''} message={alertMessage.email} alertClass={EAlertClass.Danger} />
                        </div>
                        <div className="form-group">
                            <label asp-for="Input.Password">Password</label>
                            <input value={registerData.password} onChange={(e) => handleChange(e.target)} className="form-control" type="password" id="password"/>
                            <Alert show={alertMessage.password !== ''} message={alertMessage.password} alertClass={EAlertClass.Danger} />
                        </div>
                        <div className="form-group">
                            <label asp-for="Input.ConfirmPassword">Confirme password</label>
                            <input value={registerData.confirmPassword} onChange={(e) => handleChange(e.target)} className="form-control" type="password" id="confirmPassword"/>
                            <Alert show={alertMessage.confirmPassword !== ''} message={alertMessage.confirmPassword} alertClass={EAlertClass.Danger} />
                        </div>
                        <div className="form-group">
                            <label asp-for="Input.FirstName">Firstname</label>
                            <input value={registerData.firstname} onChange={(e) => handleChange(e.target)} className="form-control" id="firstname"/>
                            <Alert show={alertMessage.firstname !== ''} message={alertMessage.firstname} alertClass={EAlertClass.Danger} />
                        </div>
                        <div className="form-group">
                            <label asp-for="Input.LastName">Lastname</label>
                            <input value={registerData.lastname} onChange={(e) => handleChange(e.target)} className="form-control" id="lastname"/>
                            <Alert show={alertMessage.lastname !== ''} message={alertMessage.lastname} alertClass={EAlertClass.Danger} />
                        </div>
                        <button onClick={(e) => registerClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;