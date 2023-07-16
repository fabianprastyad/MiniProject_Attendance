import React, { useState } from "react";
import { Navbar } from "flowbite-react";
import RegistrationForEmployee from "../pages/registrationForEmployee";
import Greetings from "../components/greetings";
import LiveAttendance from "../pages/liveAttendance";
import { useNavigate } from "react-router-dom";
import Reporting from "../pages/reporting";
import AllPayroll from "../pages/allPayroll";

const MyNavbar = ({ roleId, setMenu, user }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [activeNav, setActiveNav] = useState({
        home: false,
        registration: false,
        generatePayroll: false,
    });
    const [activeNavEmp, setActiveNavEmp] = useState({
        home: false,
        attendance: false,
        attendanceReport: false,
        payrollReport: false,
    });

    const handleHomeClick = () => {
        setMenu(<Greetings user={user} />);
        setActiveNav({ home: true });
    };

    const handleRegistrationClick = () => {
        setMenu(<RegistrationForEmployee />);
        setActiveNav({ registration: true });
    };

    const handleGeneratePayrollClick = () => {
        setMenu(<AllPayroll />);
        setActiveNav({ generatePayroll: true });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Navbar fluid rounded style={{ minWidth: "448px" }}>
            <Navbar.Brand href="https://flowbite-react.com"></Navbar.Brand>
            <div className="flex md:order-2">
                <Navbar.Toggle />
            </div>
            {roleId === 1 ? (
                <Navbar.Collapse>
                    <Navbar.Link
                        className="hover"
                        active={activeNav.home}
                        onClick={handleHomeClick}
                    >
                        <p>Home</p>
                    </Navbar.Link>
                    <Navbar.Link
                        className="hover"
                        active={activeNav.registration}
                        onClick={handleRegistrationClick}
                    >
                        registration
                    </Navbar.Link>
                    <Navbar.Link
                        className="hover"
                        active={activeNav.generatePayroll}
                        onClick={handleGeneratePayrollClick}
                    >
                        Get All Payroll
                    </Navbar.Link>
                    {token ? (
                        <Navbar.Link className="hover" onClick={handleLogout}>
                            logout
                        </Navbar.Link>
                    ) : (
                        <Navbar.Link href="#">login</Navbar.Link>
                    )}
                </Navbar.Collapse>
            ) : (
                <Navbar.Collapse>
                    <Navbar.Link
                        className="hover"
                        active={activeNavEmp.home}
                        onClick={handleHomeClick}
                    >
                        <p>Home</p>
                    </Navbar.Link>
                    <Navbar.Link
                        className="hover"
                        active={activeNavEmp.attendance}
                        onClick={() => {
                            setMenu(<LiveAttendance user={user} />);
                            setActiveNavEmp({ attendance: true });
                        }}
                    >
                        Live Attendance
                    </Navbar.Link>
                    <Navbar.Link
                        className="hover"
                        active={activeNavEmp.attendanceReport}
                        onClick={() => {
                            setMenu(<Reporting />);
                            setActiveNavEmp({ attendanceReport: true });
                        }}
                    >
                        Reporting
                    </Navbar.Link>
                    <Navbar.Link
                        className="hover"
                        active={activeNavEmp.payrollReport}
                        onClick={() => {
                            setMenu(<Reporting />);
                            setActiveNavEmp({ payrollReport: true });
                        }}
                    >
                        payroll report
                    </Navbar.Link>
                    <Navbar.Link className="hover" onClick={handleLogout}>
                        Logout
                    </Navbar.Link>
                </Navbar.Collapse>
            )}
        </Navbar>
    );
};

export default MyNavbar;
