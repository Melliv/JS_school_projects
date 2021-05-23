import { isEmptyObject } from "jquery";
import { useContext, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IAppUser } from "../../dto/IAppUser";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const Profile = () => {
    const appState = useContext(AppContext);
    const [userInfo, setUserInfo] = useState({ userInfo: {} });
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const loadData = async () => {
        let result = await BaseService.get<IAppUser>('Account/GetAppUserInfo', appState.token!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setUserInfo({ userInfo: result.data });
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Info = (props: { userInfo: {} }) => {
        if (!isEmptyObject(props.userInfo)) {
            const _userInfo = (props.userInfo as IAppUser)
            var dateFormat = require("dateformat");
            return (
                <>
                    <div>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">
                                Firstname
                            </dt>
                            <dd className="col-sm-10">
                                {_userInfo.firstName}
                            </dd>
                            <dt className="col-sm-2">
                                Lastname
                            </dt>
                            <dd className="col-sm-10">
                                {_userInfo.lastName}
                            </dd>
                            <dt className="col-sm-2">
                                User name
                            </dt>
                            <dd className="col-sm-10">
                                {_userInfo.userName}
                            </dd>
                            <dt className="col-sm-2">
                                Email
                            </dt>
                            <dd className="col-sm-10">
                                {_userInfo.email}
                            </dd>
                            <dt className="col-sm-2">
                                Phone
                            </dt>
                            <dd className="col-sm-10">
                                {_userInfo.phoneNumber ?? "-"}
                            </dd>
                            <dt className="col-sm-2">
                                Create at
                            </dt>
                            <dd className="col-sm-10">
                                {dateFormat(_userInfo.dob, "isoDate")}
                            </dd>
                            <dt className="col-sm-2">
                                Email confirmed
                            </dt>
                            <dd className="col-sm-10">
                                {_userInfo.emailConfirmed ? "✔" : "❌"}
                            </dd>
                            <dt className="col-sm-2">
                                Two factor authentication enabled
                            </dt>
                            <dd className="col-sm-10">
                                {_userInfo.twoFactorEnabled ? "✔" : "❌"}
                            </dd>
                        </dl>

                    </div>
                </>)
        }
        return <></>;
    }

    return (
        <>
            <h2>User info</h2>

            <Info {...userInfo} />

            <Loader {...pageStatus} />
        </>
    );
}

export default Profile;