import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { BloodTest } from "../../dto/BloodTest";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
 
const RowDisplay = (props: { bloodTest: BloodTest }) => (
    <>
        <td>{props.bloodTest.allowed ? '✔' : '❌'}</td>
        <td>{props.bloodTest.donor!.fullName}</td>
        <td>{props.bloodTest.doctor!.fullName}</td>
        <td>{props.bloodTest.createAt}</td>
        <td>
            <Link to={'/BloodTest/' + props.bloodTest.id}>Details</Link>
        </td>
    </>
);

const BloodTestIndex = () => {
    const [bloodTests, setBloodTests] = useState([] as BloodTest[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.getAll<BloodTest>('BloodTest', appState.token!);

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