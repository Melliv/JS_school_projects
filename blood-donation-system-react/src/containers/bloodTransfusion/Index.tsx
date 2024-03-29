import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { BloodTransfusion } from "../../dto/BloodTransfusion";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRoutePersonId } from "../../types/IRoutePersonId";

const RowDisplay = (props: { bloodTransfusion: BloodTransfusion }) => {
    var dateFormat = require("dateformat");
    return (
    <>
        <td>{props.bloodTransfusion.amount}</td>
        <td>{props.bloodTransfusion.bloodGroup!.bloodGroupValue}</td>
        <td>{props.bloodTransfusion.donor!.fullName}</td>
        <td>{props.bloodTransfusion.doctor!.fullName}</td>
        <td>{dateFormat(props.bloodTransfusion.createAt, "dd/mm/yyyy")}</td>
        <td>
            <Link to={'/BloodTransfusion/' + props.bloodTransfusion.id}>Details</Link>
        </td>
    </>);
}


const BloodTransfusionIndex = () => {
    const { personId } = useParams() as IRoutePersonId;
    const [contactTypes, setBloodTests] = useState([] as BloodTransfusion[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = (personId == null) 
            ? await BaseService.getAll<BloodTransfusion>('BloodTransfusion', appState.token!)
            : await BaseService.getAll<BloodTransfusion>('BloodTransfusion/personId=' + personId, appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setBloodTests(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <h1>Blood tests</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Blood group</th>
                        <th>Donor</th>
                        <th>Doctor</th>
                        <th>Created at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contactTypes.map(bloodTransfusion =>
                        <tr key={bloodTransfusion.id.toString()}>
                            <RowDisplay bloodTransfusion={bloodTransfusion} />
                        </tr>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default BloodTransfusionIndex;