import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Alert, { EAlertClass } from "../../components/Alert";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { Contact } from "../../dto/Contact";
import { ContactType } from "../../dto/ContactType";
import { Person } from "../../dto/Person";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";
import { isEmptyObject } from "jquery";

const initialFormValues: Contact = {
    id: "00000000-0000-0000-0000-000000000000",
    createdBy: "-",
    createAt: "0001-01-01T00:00:00",
    updateBy: "-",
    updatedAt: "0001-01-01T00:00:00",
    contactValue: "",
    contactTypeId: null,
    contactType: null,
    personId: null,
    person: null,
};

const ContactIndex = () => {
    const validationTemplate = {
        error: "",
        contactValue: "",
        contactType: "",
    }

    const { id } = useParams() as IRouteId;
    const [person, setPerson] = useState({ person: {} });
    const [contacts, setContacts] = useState([] as Contact[]);
    const [contactTypes, setContactTypes] = useState([] as ContactType[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [alertMessage, setAlertMessage] = useState(validationTemplate);

    const loadData = async () => {
        setFormValues({ ...formValues, personId: id });

        let personResponse = await BaseService.getAll<Person>('Persons/' + id, appState.token!);
        let contactTypeResponse = await BaseService.getAll<ContactType>('contactTypes', appState.token!);
        let contactResponse = await BaseService.getAll<Contact>('Contacts/person=' + id, appState.token!);

        if (personResponse.ok && personResponse.data &&
            contactTypeResponse.ok && contactTypeResponse.data &&
            contactResponse.ok && contactResponse.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPerson({ person: personResponse.data });
            setContactTypes(contactTypeResponse.data);
            setContacts(contactResponse.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: contactResponse.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleValidation = () => {
        let formIsValid = true;

        setAlertMessage(validationTemplate)

        if (!formValues.contactValue) {
            setAlertMessage(prevState => ({
                ...prevState,
                contactValue: "Contact value field can not be empty!"
            }));
            formIsValid = false;
        }

        if (formValues.contactValue!.length > 128) {
            setAlertMessage(prevState => ({
                ...prevState,
                contactValue: "Contact value field can not be empty!"
            }));
            formIsValid = false;
        }

        if (!formValues.contactTypeId) {
            setAlertMessage(prevState => ({
                ...prevState,
                contactType: "Contact type value field can not be empty!"
            }));
            formIsValid = false;
        }

        return formIsValid;
    }

    const createSubmit = async (e: Event) => {
        e.preventDefault();

        if (!handleValidation()) return;

        let response = await BaseService.post<Contact>("Contacts", formValues, appState.token!);
        if (!response.ok) {
            setAlertMessage(prevState => ({
                ...prevState,
                error: response.messages!
            }));
        } else {
            const newContacts = contacts.concat(response.data!)
            setContacts(newContacts);
            setFormValues({ ...initialFormValues, personId: id });
        }
    }

    const deleteSubmit = async (e: Event, id: string) => {
        e.preventDefault();

        let response = await BaseService.delete<Contact>("Contacts/" + id, appState.token!);
        if (!response.ok) {
            setAlertMessage(prevState => ({
                ...prevState,
                error: response.messages!
            }));
        } else {
            const newContacts = contacts.filter((item) => item.id !== id);
            setContacts(newContacts);
        }
    }

    const editSubmit = async (e: Event, contact: Contact) => {
        e.preventDefault();

        await deleteSubmit(e, contact.id);
        setFormValues(prevState => ({
            ...prevState,
            contactValue: contact.contactValue,
            contactTypeId: contact.contactTypeId
        }));
    }

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        switch (target.id) {
            case 'contactValue':
                setFormValues({ ...formValues, contactValue: target.value });
                return
            case 'contactType':
                setFormValues({ ...formValues, contactTypeId: target.value });
                return
        }
    }

    const PersonInfo = (props: { person: {} }) => {
        if (!isEmptyObject(contacts)) {
            const _person = props.person as Person;
            return (
                <h2 className="m-4">
                    <span className="font-weight-bold mr-2">
                        {_person.fullName}
                    </span>
                contacts
                </h2>)
        }
        return <></>;
    }

    return (
        <>
            <Alert show={alertMessage.error !== ''} message={alertMessage.error} alertClass={EAlertClass.Danger} />
            <Link to={'/Person/' + id}>Back to person details</Link>
            <PersonInfo {...person} />
            <h3>Create</h3>
            <div className="row m-2">
                <form asp-action="Create" className="row">
                    <div className="col">
                        <label className="control-label">Contact value</label>
                        <input value={formValues.contactValue ?? 0} onChange={(e) => handleChange(e.target)} maxLength={128} className="form-control" id="contactValue" />
                        <Alert show={alertMessage.contactValue !== ''} message={alertMessage.contactValue} alertClass={EAlertClass.Danger} />
                    </div>
                    <div className="col">
                        <label className="control-label">Contact type</label>
                        <select value={formValues.contactTypeId ?? 0} onChange={(e) => handleChange(e.target)} className="form-control" id="contactType">
                            <option></option>
                            {contactTypes.map(contactType => {
                                return <option key={contactType.id} value={contactType.id}>{contactType.contactTypeValue}</option>
                            })}
                        </select>
                        <Alert show={alertMessage.contactType !== ''} message={alertMessage.contactType} alertClass={EAlertClass.Danger} />
                    </div>
                    <div className="col mt-4">
                        <button type="submit" onClick={(e) => createSubmit(e.nativeEvent)} className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>

            <h3>List</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Contact value</th>
                        <th>Contact type value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact =>
                        <tr key={contact.id.toString()}>
                            <td>{contact.contactValue}</td>
                            <td>{contact.contactType!.contactTypeValue}</td>
                            <td>
                                <button type="submit" onClick={(e) => deleteSubmit(e.nativeEvent, contact.id)} className="btn btn-primary mr-2">Remove</button>
                                <button type="submit" onClick={(e) => editSubmit(e.nativeEvent, contact)} className="btn btn-primary">Edit</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default ContactIndex;