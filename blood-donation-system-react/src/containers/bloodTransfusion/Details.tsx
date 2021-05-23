import { isEmptyObject } from "jquery";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { BloodTransfusion } from "../../dto/BloodTransfusion";
import { TransferableBlood } from "../../dto/TransferableBlood";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRouteId } from "../../types/IRouteId";


const BloodTransfusionDetails = () => {
    const { id } = useParams() as IRouteId;
    const [bloodTransfusion, setBloodTransfusion] = useState({ bloodTransfusion: {} });
    const [transferableBlood, setTransferableBlood] = useState([] as TransferableBlood[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let BloTraresult = await BaseService.get<BloodTransfusion>('BloodTransfusion/' + id, appState.token!);
        let TraBloresult = await BaseService.getAll<TransferableBlood>('TransferableBlood/bloodTransfusionId=' + id, appState.token!);

        if (BloTraresult.ok && BloTraresult.data &&
            TraBloresult.ok && TraBloresult.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setBloodTransfusion({ bloodTransfusion: BloTraresult.data });
            setTransferableBlood(TraBloresult.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: (!BloTraresult.ok ? BloTraresult: TraBloresult).statusCode });
        }
    }

    const RowDisplay = (props: { transferableBlood: TransferableBlood }) => (
        <>
            <td>
                <Link to={'/BloodDonate/' + props.transferableBlood.bloodDonateId}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-droplet-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z" />
                    </svg>
                </Link>
            </td>
            <td>{props.transferableBlood.amount}</td>
            <td>{props.transferableBlood.bloodDonate!.donor!.fullName}</td>
        </>
    );

    const Info = (props: { bloodTransfusion: {}}) => {
        if (!isEmptyObject(props.bloodTransfusion)) {
            const _bloodTransfusion = (props.bloodTransfusion as BloodTransfusion)
            var dateFormat = require("dateformat");
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
                                <Link to={"/Person/" + _bloodTransfusion.donorId}>{_bloodTransfusion.donor!.fullName}</Link>
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
                                {dateFormat(_bloodTransfusion.createAt, "UTC:dd/mm/yyyy HH:mm")}
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
                                {dateFormat(_bloodTransfusion.updatedAt, "UTC:dd/mm/yyyy HH:mm")}
                            </dd>
                        </dl>

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

            <Info {...bloodTransfusion}/>

            <h2>Blood to use</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Blood</th>
                        <th>Amount</th>
                        <th>Donor fullName</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {transferableBlood.map(transferableBlood =>
                    <tr key={transferableBlood.id} >
                        <RowDisplay transferableBlood={transferableBlood} ></RowDisplay>
                    </tr>
                )}
                </tbody>
            </table>

            <div>
                <Link className="nav-link text-dark" to="/BloodTransfusion">to list</Link>
            </div>

            <Loader {...pageStatus} />
        </>
    );
}

export default BloodTransfusionDetails;