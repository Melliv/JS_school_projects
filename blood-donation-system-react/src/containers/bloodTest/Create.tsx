import { useEffect, useState } from "react";
import { useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { BloodGroup } from "../../dto/BloodGroup";
import { BloodTest } from "../../dto/BloodTest";
import { Person } from "../../dto/Person";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import Loader from "../../components/Loader";
import { IFormProps } from "../../types/IFormProps";

const initialFormValues: BloodTest = {
    id: "00000000-0000-0000-0000-000000000000",
    createdBy: "-",
    createAt: "0001-01-01T00:00:00",
    updateBy: "-",
    updatedAt: "0001-01-01T00:00:00",
    allowed: false,
    comments: "",
    donorId: "",
    donor: null,
    doctorId: "",
    doctor: null,
    bloodGroupId: "",
    bloodGroup: null,
    overviewData: ""
};

const FormView = (props: IFormProps<BloodTest>) => {
    //const { personId, bloodGroupId } = useParams() as { personId: string, bloodGroupId: string };
    const validationTemplate = {
        error: "",
        donor: "",
        doctor: "",
        bloodGroup: "",
        comments: ""
    }

    const [patients, setPatients] = useState([] as Person[]);
    const [doctors, setDoctors] = useState([] as Person[]);
    const [bloodGroups, setBloodGroups] = useState([] as BloodGroup[]);
    const [submit, setSubmit] = useState("");

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [alertMessage, setAlertMessage] = useState(validationTemplate);

    const appState = useContext(AppContext);

    const loadData = async () => {
        let resultPatients = await BaseService.getAll<Person>('/Persons', appState.token!);
        let resultDoctors = await BaseService.getAll<Person>('/Persons/personType=Doctor', appState.token!);
        let resultBloodGroup = await BaseService.getAll<BloodGroup>('/BloodGroup', appState.token!);

        if (resultPatients.ok && resultPatients.data &&
            resultDoctors.ok && resultDoctors.data &&
            resultBloodGroup.ok && resultBloodGroup.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPatients(resultPatients.data);
            setDoctors(resultDoctors.data);
            setBloodGroups(resultBloodGroup.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: resultBloodGroup.statusCode });
        }

/*         if (personId && bloodGroupId) {
            setFormValues({ ...formValues, donorId: target.value });
        } */
    }

    const handleValidation = () => {
        let formIsValid = true;

        setAlertMessage(validationTemplate);

        if(!props.values.donorId){
            setAlertMessage(prevState => ({
                ...prevState,
                donor: "Donor field can not be empty!"
            }));
            formIsValid = false;
        }

        if(!props.values.doctorId){
            setAlertMessage(prevState => ({
                ...prevState,
                doctor: "Doctor field can not be empty!"
            }));
            formIsValid = false;
        }

        if(!props.values.bloodGroupId){
            setAlertMessage(prevState => ({
                ...prevState,
                bloodGroup: "blood group field can not be empty!"
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

        let response = await BaseService.post("BloodTest", props.values, appState.token!);
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
            {submit !== "" ? <Redirect to={'/BloodTest/' + submit} /> : null}
            <form>
                <Alert show={alertMessage.error !== ''} message={alertMessage.error} alertClass={EAlertClass.Danger} />
                <div className="form-group">
                    <label className="control-label">Doctor</label>
                    <select value={props.values.doctorId ?? 0} onChange={(e) => props.handleChange(e.target)} className="form-control" id="doctor">
                        <option></option>
                        {doctors.map(doctor => {
                            return <option key={doctor.id} value={doctor.id}>{doctor.fullName}</option>
                        })}
                    </select>
                    <Alert show={alertMessage.doctor !== ''} message={alertMessage.doctor} alertClass={EAlertClass.Danger} />
                </div>

                <div className="form-group">
                    <label className="control-label">Donor</label>
                    <select value={props.values.donorId ?? 0} onChange={(e) => props.handleChange(e.target)} className="form-control" id="donor">
                        <option></option>
                        {patients.map(patient => {
                            return <option key={patient.id} value={patient.id}>{patient.fullName}</option>
                        })}
                    </select>
                    <Alert show={alertMessage.donor !== ''} message={alertMessage.donor} alertClass={EAlertClass.Danger} />
                </div>

                <div className="form-group">
                    <label className="control-label">Blood group</label>
                    <select value={props.values.bloodGroupId ?? 0} onChange={(e) => props.handleChange(e.target)} className="form-control" id="bloodGroup">
                        <option></option>
                        {bloodGroups.map(bloodGroup => {
                            return <option key={bloodGroup.id} value={bloodGroup.id}>{bloodGroup.bloodGroupValue}</option>
                        })}
                    </select>
                    <Alert show={alertMessage.bloodGroup !== ''} message={alertMessage.bloodGroup} alertClass={EAlertClass.Danger} />
                </div>

                <div className="form-group col-3">
                    <label className="control-label">Allowed</label>
                    <input checked={props.values.allowed ?? false} onChange={(e) => props.handleChange(e.target)} type="checkbox" className="form-control" id="allowed" />
                </div>

                <div className="form-group">
                    <label htmlFor="formTextArea">Comments</label>
                    <textarea value={props.values.comments ?? 0} onChange={(e) => props.handleChange(e.target)} maxLength={1024} className="form-control" id="comments" rows={3}></textarea>
                    <Alert show={alertMessage.comments !== ''} message={alertMessage.comments} alertClass={EAlertClass.Danger} />
                </div>

                <div className="form-group">
                    <button type="submit" onClick={(e) => createSubmit(e.nativeEvent)} className="btn btn-primary">Create</button>
                </div>
            </form>
            <Loader {...pageStatus} />
        </>
    );
}


const BloodTestCreate = () => {
    const { personId, bloodGroupId } = useParams() as { personId: string, bloodGroupId: string };

    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
        if (personId && bloodGroupId) {
            setFormValues({ ...formValues, donorId: personId, bloodGroupId: bloodGroupId});
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        switch (target.id) {
            case 'doctor':
                setFormValues({ ...formValues, doctorId: target.value });
                return
            case 'donor':
                setFormValues({ ...formValues, donorId: target.value });
                return
            case 'bloodGroup':
                setFormValues({ ...formValues, bloodGroupId: target.value });
                return
            case 'allowed':
                setFormValues({ ...formValues, allowed: (target as HTMLInputElement).checked });
                return
            case 'comments':
                setFormValues({ ...formValues, comments: target.value });
                return
        }
    }

    return (
        <>
            <h1>Create</h1>
            <h4>Blood test</h4>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <FormView values={formValues} handleChange={handleChange} />
                </div>
            </div>
        </>
    )

}

export default BloodTestCreate;