import { BrowserRouter, Route, Routes } from "react-router-dom";


//routes
import Login from "./pages/login"
import Attendance from "./pages/liveAttendance"
import Registration from "./pages/registrationForEmployee"
import MyNavbar from "./components/navbar"
import Dashboard from "./pages/dashboard"
import Reporting from "./pages/reporting"
import ShowPayroll from "./pages/showPayroll"
import AllPayroll from "./pages/allPayroll"
import Auth from "./components/auth"
import Greeting from "./components/greetings"
import Sidebar from "./components/sidebar"

function routeList() {
    return (

        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Login />

                    }
                />
                <Route
                    path="/attendance"
                    element={

                        <Attendance />

                    }
                >
                </Route>
                <Route
                    path="/registration"
                    element={
                        <Registration />

                    }
                >

                </Route>
                <Route
                    path="/navbar"
                    element={
                        <MyNavbar />

                    }
                >

                </Route>
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard />
                    }
                >

                </Route>
                <Route
                    path="/reporting"
                    element={
                        <Reporting />

                    }
                >

                </Route>
                <Route
                    path="/showpayroll"
                    element={
                        <ShowPayroll />

                    }
                >

                </Route>
                <Route
                    path="/allPayroll"
                    element={
                        <AllPayroll />

                    }
                >

                </Route>

                <Route
                    path="/auth"
                    element={
                        <Auth />

                    }
                >

                </Route>
                <Route
                    path="/greeting"
                    element={
                        <Greeting />

                    }
                >

                </Route>
                <Route
                    path="/sidebar"
                    element={
                        <Sidebar />

                    }
                >

                </Route>


            </Routes>
        </BrowserRouter>

    )
}

export default routeList