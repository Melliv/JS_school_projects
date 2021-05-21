import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { BloodDonate } from "../../dto/BloodDonate";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const RowDisplay = (props: { bloodDonate: BloodDonate }) => (
    <>
        <td>{props.bloodDonate.bloodGroup!.bloodGroupValue}</td>
        <td>{props.bloodDonate.amount}</td>
        <td>{props.bloodDonate.donor!.fullName}</td>
        <td>{props.bloodDonate.doctor!.fullName}</td>
        <td>{props.bloodDonate.createAt}</td>
        <td>
            <Link to={'/BloodDonate/' + props.bloodDonate.id}>Details</Link>
        </td>
    </>
);

const BloodDonateIndex = () => {
    const [bloodDonates, setBloodDonates] = useState([] as BloodDonate[]);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.getAll<BloodDonate>('/BloodDonate', appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setBloodDonates(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <h1>Blood donations</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Blood group</th>
                        <th>Amount</th>
                        <th>Donor</th>
                        <th>Doctor</th>
                        <th>Created at</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {bloodDonates.map(bloodDonate =>
                        <tr key={bloodDonate.id.toString()}>
                            <RowDisplay bloodDonate={bloodDonate} />
                        </tr>)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default BloodDonateIndex;