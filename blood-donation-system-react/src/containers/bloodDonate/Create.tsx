import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { BloodDonate } from "../../dto/BloodDonate";
import { BloodTest } from "../../dto/BloodTest";
import { Person } from "../../dto/Person";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import Alert, { EAlertClass } from "../../components/Alert";
import { Redirect } from "react-router-dom";
import Loader from "../../components/Loader";
import { IFormProps } from "../../types/IFormProps";

const initialFormValues: BloodDonate = {
    id: "00000000-0000-0000-0000-000000000000",
    createdBy: "-",
    createAt: "0001-01-01T00:00:00",
    updateBy: "-",
    updatedAt: "0001-01-01T00:00:00",
    donorId: "",
    donor: null,
    doctorId: "",
    doctor: null,
    bloodTestId: "",
    blootest: null,
    bloodGroupId: "00000000-0000-0000-0000-000000000000",
    bloodGroup: null,
    amount: 0,
    available: true,
    expireDate: "0001-01-01T00:00:00",
};

const FormView = (props: IFormProps<BloodDonate>) => {
    const validationTemplate = {
        "error": "",
        "amount": "",
        "donor": "",
        "doctor": "",
        "bloodTest": ""}

    const [patients, setPatients] = useState([] as Person[]);
    const [doctors, setDoctors] = useState([] as Person[]);
    const [bloodTests, setBloodTests] = useState([] as BloodTest[]);
    const [submit, setSubmit] = useState("");

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [alertMessage, setAlertMessage] = useState(validationTemplate);
    const appState = useContext(AppContext);

    const loadData = async () => {
        let resultPatients = await BaseService.getAll<Person>('/Persons/personType=Patient', appState.token!);
        let resultDoctors = await BaseService.getAll<Person>('/Persons/personType=Doctor', appState.token!);
        let resultBloodTests = await BaseService.getAll<BloodTest>('/BloodTest/minimum', appState.token!);

        if (resultPatients.ok && resultPatients.data &&
            resultDoctors.ok && resultDoctors.data &&
            resultBloodTests.ok && resultBloodTests.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPatients(resultPatients.data);
            setDoctors(resultDoctors.data);
            setBloodTests(resultBloodTests.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: resultBloodTests.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleValidation = () => {
        let formIsValid = true;

        setAlertMessage(validationTemplate);

        if(props.values.amount === 0){
            setAlertMessage(prevState => ({
                ...prevState,
                "amount": "Amount can not be 0!"
            }));
            formIsValid = false;
        }

        if(props.values.donorId === ""){
            setAlertMessage(prevState => ({
                ...prevState,
                "donor": "Donor field can not be empty!"
            }));
            formIsValid = false;
        }

        if(props.values.doctorId === ""){
            setAlertMessage(prevState => ({
                ...prevState,
                "doctor": "Doctor field can not be empty!"
            }));
            formIsValid = false;
        }

        if(props.values.bloodTestId === ""){
            setAlertMessage(prevState => ({
                ...prevState,
                "bloodTest": "bloodTest field can not be empty!"
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

        let response = await BaseService.post("BloodDonate", props.values, appState.token!);
        if (!response.ok) {
            setAlertMessage(prevState => ({
                ...prevState,
                "error": response.messages!
            }));

        } else {
            setAlertMessage(prevState => ({
                ...prevState,
                "error": ""
            }));
            setSubmit(response.data!.id);
        }
    }

    return (
        <>
        <form>
            { submit !== "" ? <Redirect to={'/BloodDonate/' + submit} /> : null}
            <Alert show={alertMessage.error !== ''} message={alertMessage.error} alertClass={EAlertClass.Danger} />
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
                <label className="control-label">Blood test</label>
                <select value={props.values.bloodTestId ?? 0} onChange={(e) => props.handleChange(e.target)} className="form-control" id="bloodTest">
                    <option></option>
                    {bloodTests.map(bloodTest => {
                        return <option key={bloodTest.id} value={bloodTest.id}>{bloodTest.overviewData}</option>
                    })}
                </select>
                <Alert show={alertMessage.bloodTest !== ''} message={alertMessage.bloodTest} alertClass={EAlertClass.Danger} />
            </div>

            <div className="form-group">
                <label className="control-label">Amount</label>
                <input value={props.values.amount ?? 0} onChange={(e) => props.handleChange(e.target)} className="form-control" id="amount" />
                <Alert show={alertMessage.amount !== ''} message={alertMessage.amount} alertClass={EAlertClass.Danger} />
            </div>

            <div className="form-group">
                <button type="submit" onClick={(e) => createSubmit(e.nativeEvent)} className="btn btn-primary">Create</button>
            </div>
        </form>
        <Loader {...pageStatus} />
        </>
    );
}


const BloodDonateCreate = () => {

    const [formValues, setFormValues] = useState(initialFormValues);

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        switch (target.id) {
            case 'doctor':
                setFormValues({ ...formValues, doctorId: target.value });
                return;
            case 'donor':
                setFormValues({ ...formValues, donorId: target.value });
                return;
            case 'bloodTest':
                setFormValues({ ...formValues, bloodTestId: target.value });
                return;
            case 'amount':
                setFormValues({ ...formValues, amount: target.value === "" ? 0 : parseInt(target.value) });
                return;
        }
    }

    return (
        <>
            <h1>Create</h1>
            <h4>Blood donate</h4>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <FormView values={formValues} handleChange={handleChange} />
                </div>
            </div>
        </>
    )

}

export default BloodDonateCreate;