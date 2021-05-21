import { isEmptyObject } from "jquery";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { Person } from "../../dto/Person";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";


const PersonDetails = () => {
    const { id } = useParams() as IRouteId;
    const [person, setPerson] = useState({ person: {} });
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.get<Person>('Persons/' + id, appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPerson({ person: result.data });
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Info = (props: { person: {} }) => {
        if (!isEmptyObject(props.person)) {
            const _person = props.person as Person
            return (
                <>
                    <div>
                        <h4>Person</h4>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">
                                Firstname
                            </dt>
                            <dd className="col-sm-10">
                                {_person.firstname}
                            </dd>
                            <dt className="col-sm-2">
                                Lastname
                            </dt>
                            <dd className="col-sm-10">
                                {_person.lastname}
                            </dd>
                            <dt className="col-sm-2">
                                Identification code
                            </dt>
                            <dd className="col-sm-10">
                                {_person.identificationCode}
                            </dd>
                            <dt className="col-sm-2">
                                Person type
                            </dt>
                            <dd className="col-sm-10">
                                {_person.personType!.personTypeValue}
                            </dd>
                            <dt className="col-sm-2">
                                Blood group value
                            </dt>
                            <dd className="col-sm-10">
                                {(_person.bloodGroup != null) ? _person.bloodGroup!.bloodGroupValue : ""}
                            </dd>
                            <dt className="col-sm-2">
                                Comments
                            </dt>
                            <dd className="col-sm-10">
                                {_person.comments}
                            </dd>
                            <dt className="col-sm-2">
                                Created by
                            </dt>
                            <dd className="col-sm-10">
                                {_person.createdBy}
                            </dd>
                            <dt className="col-sm-2">
                                Create at
                            </dt>
                            <dd className="col-sm-10">
                                {_person.createAt}
                            </dd>
                            <dt className="col-sm-2">
                                Update by
                            </dt>
                            <dd className="col-sm-10">
                                {_person.updateBy}
                            </dd>
                            <dt className="col-sm-2">
                                Updated at
                            </dt>
                            <dd className="col-sm-10">
                                {_person.updatedAt}
                            </dd>
                        </dl>
                    </div>

                    <dt className="col-sm-2 m-1">
                        <Link className="btn btn-primary" to={"/Contact/" + _person.id}>
                            Person contacts
                        </Link>
                    </dt>

                </>)
        }
        return <></>;
    }

    return (
        <>
            <h1>Details</h1>

            <Info {...person} />

            <Loader {...pageStatus} />
        </>
    );
}

export default PersonDetails;