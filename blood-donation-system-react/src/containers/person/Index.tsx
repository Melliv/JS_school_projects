import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { Person } from "../../dto/Person";
import { SearchPerson } from "../../dto/SearchPerson";
import { BaseService } from "../../services/base-service";
import { IFormProps } from "../../types/IFormProps";


const initialFormValues: SearchPerson = {
    firstname: "",
    lastname: "",
    identificationCode: "",
};

const FormView = (props: IFormProps<SearchPerson>) => {
    const [submit, setSubmit] = useState(false);
    const [persons, setPersons] = useState([] as Person[]);

    const [alertMessage, setAlertMessage] = useState('');
    const appState = useContext(AppContext);

    const createSubmit = async (e: Event) => {
        e.preventDefault();

        const uri = "Persons/searchperson" +
            "?firstname=" + props.values.firstname +
            "&lastname=" + props.values.lastname +
            "&identificationCode=" + props.values.identificationCode;
        let response = await BaseService.getAll<Person>(uri, appState.token!);
        if (response.ok && response.data) {
            setAlertMessage('');
            setPersons(response.data);
            setSubmit(true);
        } else {
            setAlertMessage(response.messages!);
        }
    }

    const RowDisplay = (props: { person: Person }) => (
        <>
            <td>
                <Link to={'/Person/' + props.person.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-droplet-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z" />
                    </svg>
                </Link>
            </td>
            <td>{props.person.firstname}</td>
            <td>{props.person.lastname}</td>
            <td>{props.person.identificationCode}</td>
        </>
    );

    return (
        <>
            <div className="small-middle-container">
                <form asp-action="Index" method="get" id="search-form">
                    <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                    <h3>Search Person</h3>

                    <div className="col">Firstname</div>
                    <div className="col">
                        <input value={props.values.firstname ?? 0} onChange={(e) => props.handleChange(e.target)} id="firstname" className="form-control mb-2 mr-sm-2" />
                    </div>

                    <div className="col">Lastname</div>
                    <div className="col">
                        <input value={props.values.lastname ?? 0} onChange={(e) => props.handleChange(e.target)} id="lastname" className="form-control mb-2 mr-sm-2" />
                    </div>

                    <div className="col">IdentificationCode</div>
                    <div className="col">
                        <input value={props.values.identificationCode ?? 0} onChange={(e) => props.handleChange(e.target)} id="identificationCode" className="form-control mb-2 mr-sm-2" />
                    </div>

                    <div className="col">
                        <button type="submit" onClick={(e) => createSubmit(e.nativeEvent)} className="btn btn-primary mb-2 my-1 mx-2 d-inline">Search</button>
                        <Link className="collapse-item" to="/Person/Create">Create person</Link>
                    </div>
                </form>
            </div>

            { submit ?
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Profile
                            </th>
                            <th>
                                Firstname
                            </th>
                            <th>
                                Lastname
                            </th>
                            <th>
                                IdentificationCode
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map(person =>
                            <tr key={person.id.toString()} className="searched-person">
                                <RowDisplay person={person} ></RowDisplay>
                            </tr>
                        )}
                    </tbody>
                </table>
                : null}
        </>
    );
}

const PersonIndex = () => {
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
        }
    }

    return (
        <div className="container mt-2">
            <FormView values={formValues} handleChange={handleChange} />
        </div>
    );
}

export default PersonIndex;
