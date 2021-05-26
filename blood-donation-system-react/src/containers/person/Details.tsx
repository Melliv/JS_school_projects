import { isEmptyObject } from "jquery";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { Person } from "../../dto/Person";
import { IPersonBloodDonateInfo } from "../../dto/IPersonBloodDonateInfo";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";


const PersonDetails = () => {
    const { id } = useParams() as IRouteId;
    const [person, setPerson] = useState({ person: {} });
    const [perBloDonInf, setPersonBloodDonateInfo] = useState({ perBloDonInf: {} });
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let perResult = await BaseService.get<Person>('Persons/' + id, appState.token!);
        let bloInfResult = await BaseService.get<IPersonBloodDonateInfo>('Persons/bloodDonateInfo=' + id, appState.token!);

        if (perResult.ok && perResult.data &&
            bloInfResult.ok && bloInfResult.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPerson({ person: perResult.data });
            setPersonBloodDonateInfo({ perBloDonInf: bloInfResult.data })
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: perResult.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Info = (props: { person: {}, perBloDonInf: {} }) => {
        if (!isEmptyObject(props.person) && !isEmptyObject(props.perBloDonInf)) {
            const _person = props.person as Person;
            const _perBloDonInf = props.perBloDonInf as IPersonBloodDonateInfo;
            var dateFormat = require("dateformat");
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
                                {(_person.bloodGroup != null) ? _person.bloodGroup!.bloodGroupValue : "unknown"}
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
                                {dateFormat(_person.createAt, "dd/mm/yyyy HH:MM")}
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
                                {dateFormat(_person.updatedAt, "dd/mm/yyyy HH:MM")}
                            </dd>
                            <dt className="col-sm-2">
                                Person can donate from
                            </dt>
                            <dd className="col-sm-10">
                                {dateFormat(_perBloDonInf.date, "UTC:dd/mm/yyyy")}
                            </dd>
                            <dt className="col-sm-2">
                                Allowed to donate blood
                            </dt>
                            <dd className="col-sm-10">
                                {_perBloDonInf.allowed ? "✔" : "❌"}
                            </dd>
                            <dt className="col-sm-2 m-1">
                                <Link className="btn btn-primary" to={"/Contact/" + _person.id}>
                                    Person contacts
                                </Link>
                            </dt>

                            <div className="btn-group col-sm-2 m-1">
                                <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Create
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to={"/BloodTest/Create/personId=" + _person.id + "&bloodGroupId=" + _person.bloodGroupId}>
                                        BloodTest
                                    </Link>
                                    <Link className="dropdown-item" to={"/BloodDonate/Create/personId=" + _person.id}>
                                        BloodDonate
                                    </Link>
                                    <Link className="dropdown-item" to={"/BloodTransfusion/Create/personId=" + _person.id + "&bloodGroupId=" + _person.bloodGroupId}>
                                        BloodTransfusion
                                    </Link>
                                </div>
                            </div>

                            <div className="btn-group col-sm-2 m-1">
                                <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Index
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to={"/BloodTest/personId=" + _person.id}>
                                        BloodTest
                                    </Link>
                                    <Link className="dropdown-item" to={"/BloodDonate/personId=" + _person.id}>
                                        BloodDonate
                                    </Link>
                                    <Link className="dropdown-item" to={"/BloodTransfusion/personId=" + _person.id}>
                                        BloodTransfusion
                                    </Link>
                                </div>
                            </div>

                        </dl>
                    </div>

                </>)
        }
        return <></>;
    }

    return (
        <>
            <h1>Details</h1>

            <Info {...person} {...perBloDonInf} />

            <Loader {...pageStatus} />
        </>
    );
}

export default PersonDetails;