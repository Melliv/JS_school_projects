import { useEffect, useState } from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { BloodGroup } from "../../dto/BloodGroup";
import { Person } from "../../dto/Person";
import { PersonType } from "../../dto/PersonType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IFormProps } from "../../types/IFormProps";
import Loader from "../../components/Loader";


const initialFormValues: Person = {
    id: "00000000-0000-0000-0000-000000000000",
    createdBy: "-",
    createAt: "0001-01-01T00:00:00",
    updateBy: "-",
    updatedAt: "0001-01-01T00:00:00",
    firstname: "",
    lastname: "",
    identificationCode: "",
    comments: "",
    personTypeId: "",
    personType: null,
    bloodGroupId: null,
    bloodGroup: null,
    fullName: "",
};

const FormView = (props: IFormProps<Person>) => {
    const validationTemplate = {
        error: "",
        firstname: "",
        lastname: "",
        identificationCode: "",
        personType: "",
        comments: "",
    }

    const [personTypes, setPersonTypes] = useState([] as PersonType[]);
    const [bloodGroups, setBloodGroups] = useState([] as BloodGroup[]);
    const [submit, setSubmit] = useState("");

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [alertMessage, setAlertMessage] = useState(validationTemplate);
    const appState = useContext(AppContext);

    const loadData = async () => {
        let resultPersonType = await BaseService.getAll<PersonType>('/PersonType', appState.token!);
        let resultBloodGroup = await BaseService.getAll<BloodGroup>('/BloodGroup', appState.token!);

        if (resultPersonType.ok && resultPersonType.data &&
            resultBloodGroup.ok && resultBloodGroup.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPersonTypes(resultPersonType.data);
            setBloodGroups(resultBloodGroup.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, 
                statusCode: (!resultPersonType.ok ?  resultPersonType : resultBloodGroup).statusCode });
        }
    }

    const handleValidation = () => {
        let formIsValid = true;

        setAlertMessage(validationTemplate)

        if(!props.values.firstname){
            setAlertMessage(prevState => ({
                ...prevState,
                "firstname": "Firstname field can not be empty!"
            }));
            formIsValid = false;
        }

        if(!props.values.lastname){
            setAlertMessage(prevState => ({
                ...prevState,
                "lastname": "Lastname field can not be empty!"
            }));
            formIsValid = false;
        }

        if(!props.values.identificationCode){
            setAlertMessage(prevState => ({
                ...prevState,
                "identificationCode": "IdentificationCode field can not be empty!"
            }));
            formIsValid = false;
        }

        if(!props.values.personTypeId){
            setAlertMessage(prevState => ({
                ...prevState,
                "personType": "Person type field can not be empty!"
            }));
            formIsValid = false;
        }

       return formIsValid;
   }

    const createSubmit = async (e: Event) => {
        e.preventDefault();

        if (!handleValidation()) {
            return;
        }

        let response = await BaseService.post("Persons", props.values, appState.token!);
        if (!response.ok) {
            setAlertMessage(prevState => ({
                ...prevState,
                "error": response.messages!
            }));
        } else {
            setSubmit(response.data!.id);
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <form asp-action="Create" id="create-person">
                {submit !== "" ? <Redirect to={'/Person/' + submit} /> : null}
                <Alert show={alertMessage.error !== ''} message={alertMessage.error} alertClass={EAlertClass.Danger} />
                <div className="form-group">
                    <label className="control-label">Firstname</label>
                    <input value={props.values.firstname ?? 0} onChange={(e) => props.handleChange(e.target)} maxLength={128} className="form-control" id="firstname"/>
                    <Alert show={alertMessage.firstname !== ''} message={alertMessage.firstname} alertClass={EAlertClass.Danger} />
                </div>
                <div className="form-group">
                    <label className="control-label">Lastname</label>
                    <input value={props.values.lastname ?? 0} onChange={(e) => props.handleChange(e.target)} maxLength={128} className="form-control" id="lastname"/>
                    <Alert show={alertMessage.lastname !== ''} message={alertMessage.lastname} alertClass={EAlertClass.Danger} />
                </div>
                <div className="form-group">
                    <label className="control-label">IdentificationCode</label>
                    <input value={props.values.identificationCode ?? 0} onChange={(e) => props.handleChange(e.target)} maxLength={128} className="form-control" id="identificationCode"/>
                    <Alert show={alertMessage.identificationCode !== ''} message={alertMessage.identificationCode} alertClass={EAlertClass.Danger} />
                </div>
                <div className="form-group">
                    <label className="control-label">Comments</label>
                    <textarea value={props.values.comments ?? 0} onChange={(e) => props.handleChange(e.target)} maxLength={1024} className="form-control" rows={5} id="comments"></textarea>
                    <Alert show={alertMessage.comments !== ''} message={alertMessage.comments} alertClass={EAlertClass.Danger} />
                </div>
                <div className="form-group">
                    <label className="control-label">Person type</label>
                    <select value={props.values.personTypeId ?? 0} onChange={(e) => props.handleChange(e.target)} className="form-control" id="personType">
                        <option></option>
                        {personTypes.map(personType => {
                            return <option key={personType.id} value={personType.id}>{personType.personTypeValue}</option>
                        })}
                    </select>
                    <Alert show={alertMessage.personType !== ''} message={alertMessage.personType} alertClass={EAlertClass.Danger} />
                </div>
                <div className="form-group">
                    <label className="control-label">Blood group</label>
                    <select value={props.values.bloodGroupId ?? 0} onChange={(e) => props.handleChange(e.target)} className="form-control" id="bloodGroup">
                        <option></option>
                        {bloodGroups.map(bloodGroup => {
                            return <option key={bloodGroup.id} value={bloodGroup.id}>{bloodGroup.bloodGroupValue}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={(e) => createSubmit(e.nativeEvent)} className="btn btn-primary">Create</button>
                </div>
            </form>
            <Loader {...pageStatus} />
        </>
    );
}


const PersonCreate = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        switch (target.id) {
            case 'firstname':
                setFormValues({ ...formValues, firstname: target.value });
                return
            case 'lastname':
                setFormValues({ ...formValues, lastname: target.value });
                return
            case 'identificationCode':
                setFormValues({ ...formValues, identificationCode: target.value });
                return
            case 'comments':
                setFormValues({ ...formValues, comments: target.value });
                return
            case 'personType':
                setFormValues({ ...formValues, personTypeId: target.value });
                return
            case 'bloodGroup':
                setFormValues({ ...formValues, bloodGroupId: target.value });
                return
        }
    }

    return (
        <>
            <h1>Create</h1>
            <h4>Blood Person</h4>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <FormView values={formValues} handleChange={handleChange} />
                </div>
            </div>
        </>
    )

}

export default PersonCreate;