import { isEmptyObject } from "jquery";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { BloodDonate } from "../../dto/BloodDonate";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";


const BloodDonateDetails = () => {
    const { id } = useParams() as IRouteId;
    const [bloodDonate, setBloodTest] = useState({ bloodDonate: {} });
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);


    const loadData = async () => {
        let result = await BaseService.get<BloodDonate>('/BloodDonate/' + id, appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setBloodTest({ bloodDonate: result.data });
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    const Info = (props: { bloodDonate: {} }) => {
        if (!isEmptyObject(props.bloodDonate)) {
            const _bloodDonate = props.bloodDonate as BloodDonate
            return (
                <>
                    <div>
                        <h4>Blood donation</h4>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">
                                Blood group
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodDonate.bloodGroup!.bloodGroupValue}
                            </dd>
                            <dt className="col-sm-2">
                                Amount
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodDonate.amount}
                            </dd>
                            <dt className="col-sm-2">
                                Donor
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodDonate.donor!.fullName}
                            </dd>
                            <dt className="col-sm-2">
                                Doctor
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodDonate.doctor!.fullName}
                            </dd>
                            <dt className="col-sm-2">
                                Expire date
                            </dt>
                            <dd className="col-sm-10">
                                { _bloodDonate.expireDate }
                            </dd>
                            <dt className="col-sm-2">
                                Created by
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodDonate.createdBy}
                            </dd>
                            <dt className="col-sm-2">
                                Create at
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodDonate.createAt}
                            </dd>
                            <dt className="col-sm-2">
                                Update by
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodDonate.updateBy}
                            </dd>
                            <dt className="col-sm-2">
                                Updated at
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodDonate.updatedAt}
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <Link className="nav-link text-dark" to="/BloodDonate/">to list</Link>
                    </div>
                </>)
        }
        return <></>;
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <h1>Details</h1>

            <Info {...bloodDonate} />

            <Loader {...pageStatus} />
        </>
    );
}

export default BloodDonateDetails;