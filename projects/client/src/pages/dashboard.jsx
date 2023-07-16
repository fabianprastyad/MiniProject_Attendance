import { useEffect, useState } from "react";
import axios from "axios";

import MyNavbar from "../components/navbar";
import Greetings from "../components/greetings";
import Auth from "../components/auth";

const Dashboard = () => {
    const token = localStorage.getItem("token");
    const [roleId, setRoleId] = useState(0);
    const [user, setUser] = useState("");
    const [menu, setMenu] = useState(<Greetings user={user} />);

    useEffect(() => {
        axios
            .get("", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setRoleId(response.data.data.user.role_id);
                setUser(response.data.data.user.Employee_detail.first_name);
            });
    }, []);

    useEffect(() => {
        setMenu(<Greetings user={user} />);
        console.log(user, roleId, "this Data");
    }, [user]);

    return (
        <div>
            <MyNavbar roleId={roleId} setMenu={setMenu} user={user} />
            {menu}
        </div>
    );
};

export default Auth(Dashboard);
