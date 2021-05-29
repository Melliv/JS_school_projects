import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./context/AppContext";

const LoginLayout = ( {children}: any ) => {
    const appState = useContext(AppContext);

    return(
        <div className="container">

            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">

                            {appState.token != null ?
                                <div className="container mt-2">
                                    <Link type="button" className="btn btn-primary" to="/">Home</Link>
                                </div>
                                :
                                <></>
                            }

                            <div className="container m-auto">
                                <main role="main" className="pb-3">
                                    {children}
                                </main>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    )

}

export default LoginLayout;
