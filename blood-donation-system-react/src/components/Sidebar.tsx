import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-droplet-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z" />
                </svg>
                <div className="sidebar-brand-text mx-3">Blood Center</div>
            </NavLink>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                General
            </div>

            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#statistics"
                    aria-expanded="true" aria-controls="statistics">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Statistics</span>
                </NavLink>
                <div id="statistics" className="collapse" aria-labelledby="headingOne" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <NavLink className="collapse-item" to="/Statistics/General" >General</NavLink>
                        <NavLink className="collapse-item" to="/Statistics/BloodDonate" >Blood donations</NavLink>
                        <NavLink className="collapse-item" to="/Statistics/BloodTransfusion" >Blood transfusions</NavLink>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Persons</span>
                </NavLink>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Activities:</h6>
                        <NavLink className="collapse-item" to="/Person">Persons</NavLink>
                        <NavLink className="collapse-item" to="/Person/Create">Register</NavLink>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Activities
            </div>

            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Blood testing</span>
                </NavLink>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Activities:</h6>
                        <NavLink className="collapse-item" to="/BloodTest">Tests</NavLink>
                        <NavLink className="collapse-item" to="/BloodTest/Create">Create</NavLink>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseThree"
                    aria-expanded="true" aria-controls="collapseThree">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Blood donation</span>
                </NavLink>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Activities:</h6>
                        <NavLink className="collapse-item" to="/BloodDonate">Donations</NavLink>
                        <NavLink className="collapse-item" to="/BloodDonate/Create">Create</NavLink>
                    </div>
                </div>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseFore"
                    aria-expanded="true" aria-controls="collapseThree">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Blood transfusion</span>
                </NavLink>
                <div id="collapseFore" className="collapse" aria-labelledby="headingFore" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Activities:</h6>
                        <NavLink className="collapse-item" to="/BloodTransfusion">BloodTransfusions</NavLink>
                        <NavLink className="collapse-item" to="/BloodTransfusion/Create">Create</NavLink>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Sidebar;
