import { isEmptyObject } from "jquery";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { BloodTest } from "../../dto/BloodTest";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";


const BloodTestDetails = () => {
    const { id } = useParams() as IRouteId;
    const [bloodTest, setBloodTest] = useState({ bloodTest: {} });
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.get<BloodTest>('BloodTest/' + id, appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setBloodTest({ bloodTest: result.data });
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    const Info = (props: { bloodTest: {} }) => {
        if (!isEmptyObject(props.bloodTest)) {
            const _bloodTest = (props.bloodTest as BloodTest)
            return (
                <>
                    <div>
                        <h4>Blood test</h4>
                        <hr />
                        <div v-if="bloodTest != null" >
                            <dl className="row">
                                <dt className="col-sm-2">
                                    Allowed
                                </dt>
                                <dd className="col-sm-10">
                                    {_bloodTest.allowed ? '✔' : '❌'}
                                </dd>
                                 <dt className="col-sm-2">
                                    Blood group
                                </dt>
                                <dd className="col-sm-10">
                                    {_bloodTest.bloodGroup!.bloodGroupValue}
                                </dd> 
                                <dt className="col-sm-2">
                                    Donor
                                </dt>
                                <dd className="col-sm-10">
                                    {_bloodTest.donor!.fullName}
                                </dd>
                                <dt className="col-sm-2">
                                    Doctor
                                </dt>
                                <dd className="col-sm-10">
                                    {_bloodTest.doctor!.fullName}
                                </dd>
                                <dt className="col-sm-2">
                                    Comments
                                </dt>
                                <dd className="col-sm-10">
                                    {_bloodTest.comments}
                                </dd>
                                <dt className="col-sm-2">
                                    Created by
                                </dt>
                                <dd className="col-sm-10">
                                    {_bloodTest.createdBy}
                                </dd>
                                <dt className="col-sm-2">
                                    Create at
                                </dt>
                                <dd className="col-sm-10">
                                    {_bloodTest.createAt}
                                </dd>
                                <dt className="col-sm-2">
                                    Update by
                                </dt>
                                <dd className="col-sm-10">
                                    {_bloodTest.updateBy}
                                </dd>
                                <dt className="col-sm-2">
                                    Updated at
                                </dt>
                                <dd className="col-sm-10">
                                    {_bloodTest.updatedAt}
                                </dd>
                            </dl>
                        </div>

                    </div>
                    <div>
                        <Link className="nav-link text-dark" to="/BloodTest/">to list</Link>
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

            <Info {...bloodTest} />

            <Loader {...pageStatus} />
        </>
    );
}

export default BloodTestDetails;