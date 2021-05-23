import { isEmptyObject } from "jquery";
import { useEffect, useState } from "react";
import { useContext } from "react";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { Statistics } from "../../dto/Statistics";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Chart } from "react-google-charts";

const BloodTransfusionStatistics = () => {
    const [statistics, setStatistics] = useState({ statistics: {} });
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.get<Statistics>('Statistics/BloodTransfusion', appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setStatistics({ statistics: result.data });
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Info = (props: { statistics: {} }) => {
        if (!isEmptyObject(props.statistics)) {
            const _statistics = props.statistics as Statistics
            return (
                <>
                    <Chart
                        width={800}
                        height={500}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={JSON.parse(_statistics.data ?? "")}
                        options={{
                            title: 'Blood transfusions statistics',
                            titleTextStyle: {
                                fontSize: 24,
                            },
                            pieSliceText: 'label',
                            backgroundColor: '#f8f9fc',
                        }}
                    />
                </>)
        }
        return <></>;
    }

    return (
        <>
            <Info {...statistics} />
            <Loader {...pageStatus} />
        </>
    );
}

export default BloodTransfusionStatistics;