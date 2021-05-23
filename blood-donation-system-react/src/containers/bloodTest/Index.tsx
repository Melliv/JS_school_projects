import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { BloodTest } from "../../dto/BloodTest";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IRoutePersonId } from "../../types/IRoutePersonId";

const RowDisplay = (props: { bloodTest: BloodTest }) => {
    var dateFormat = require("dateformat");
    return(
    <>
        <td>{props.bloodTest.allowed ? '✔' : '❌'}</td>
        <td>{props.bloodTest.donor!.fullName}</td>
        <td>{props.bloodTest.doctor!.fullName}</td>
        <td>{dateFormat(props.bloodTest.createAt, "dd/mm/yyyy")}</td>
        <td>
            <Link to={'/BloodTest/' + props.bloodTest.id}>Details</Link>
        </td>
    </>);
}


const BloodTestIndex = () => {
    const { personId } = useParams() as IRoutePersonId;
    const [bloodTests, setBloodTests] = useState([] as BloodTest[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = (personId == null) 
            ? await BaseService.getAll<BloodTest>('BloodTest', appState.token!)
            : await BaseService.getAll<BloodTest>('BloodTest/personId=' + personId, appState.token!);

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
                        <th>Allowed</th>
                        <th>Donor</th>
                        <th>Doctor</th>
                        <th>Created at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {bloodTests.map(bloodTest =>
                        <tr key={bloodTest.id.toString()}>
                            <RowDisplay bloodTest={bloodTest} />
                        </tr>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default BloodTestIndex;