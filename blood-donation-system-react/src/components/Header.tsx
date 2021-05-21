import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Redirect } from "react-router-dom";

const Header = () => {
    const appState = useContext(AppContext);
    const [submit, setSubmit] = useState("");

    const logOutClicked = (e: Event, uri: string) => {
        e.preventDefault();
        appState.clearAuthInfo(appState);
        setSubmit(uri);
    }

    const nameClicked = (e: Event, uri: string) => {
        e.preventDefault();
        console.log("here 1");
        setSubmit(uri);
    }
    
    return (
        <>
            { submit !== "" ? <Redirect to={submit} /> : null}
            <header className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-flex justify-content-end">
                    <ul className="navbar-nav float-right">
                        <li className="nav-item">
                            <button onClick={(e) => nameClicked(e.nativeEvent, "/Identity/Profile")} className="nav-link btn btn-link text-dark" title="Manage">
                                Hello! {appState.firstName} {appState.lastName}
                            </button>
                        </li>
                        <li className="nav-item">
                            <button onClick={(e) => logOutClicked(e.nativeEvent, "/Identity/Login")} className="nav-link btn btn-link text-dark">Logout</button>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default Header;