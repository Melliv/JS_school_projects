import { isEmptyObject } from "jquery";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { BloodTransfusion } from "../../dto/BloodTransfusion";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";


const BloodTransfusionDetails = () => {
    const { id } = useParams() as IRouteId;
    const [bloodTransfusion, setBloodTest] = useState({ bloodTransfusion: {} });
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.get<BloodTransfusion>('BloodTransfusion/' + id, appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setBloodTest({ bloodTransfusion: result.data });
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    const Info = (props: { bloodTransfusion: {} }) => {
        if (!isEmptyObject(props.bloodTransfusion)) {
            const _bloodTransfusion = (props.bloodTransfusion as BloodTransfusion)
            return (
                <>
                    <div>
                        <h4>Blood transfusion</h4>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">
                                Amount
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodTransfusion.amount}
                            </dd>
                            <dt className="col-sm-2">
                                Blood group
                                </dt>
                            <dd className="col-sm-10">
                                {_bloodTransfusion.bloodGroup!.bloodGroupValue}
                            </dd>
                            <dt className="col-sm-2">
                                Donor
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodTransfusion.donor!.fullName}
                            </dd>
                            <dt className="col-sm-2">
                                Doctor
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodTransfusion.doctor!.fullName}
                            </dd>
                            <dt className="col-sm-2">
                                Comments
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodTransfusion.comments}
                            </dd>
                            <dt className="col-sm-2">
                                Created by
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodTransfusion.createdBy}
                            </dd>
                            <dt className="col-sm-2">
                                Create at
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodTransfusion.createAt}
                            </dd>
                            <dt className="col-sm-2">
                                Update by
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodTransfusion.updateBy}
                            </dd>
                            <dt className="col-sm-2">
                                Updated at
                            </dt>
                            <dd className="col-sm-10">
                                {_bloodTransfusion.updatedAt}
                            </dd>
                        </dl>

                    </div>
                    <div>
                        <Link className="nav-link text-dark" to="/BloodTransfusion/">to list</Link>
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

            <Info {...bloodTransfusion} />

            <Loader {...pageStatus} />
        </>
    );
}

export default BloodTransfusionDetails;