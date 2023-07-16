import { useState } from "react";
import { TextInput, Button, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";



function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const createSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, "Password must be 6 characters at minimum")
            .required("Password is required"),
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        console.log(email.value, password.value);

        axios
            .post(`http://localhost:8000/auth/login`, {
                email: email.value,
                password: password.value,
            })
            .then(({ data }) => {
                console.log("success", data);
                localStorage.setItem("token", data.accessToken);
                navigate("/dashboard", { replace: true });
            })
            .catch(({ response }) => {
                setErrorMessage(response.data.message);
            });
    };

    return (
        <div className="flex justify-center item-center py-24 ">
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={createSchema}
                onSubmit={onSubmit}
            >
                {(props) => (
                    <div className="flex  flex-col gap-4 w-96 px-7 py-24 border bg-slate-300	 justify-center">
                        <div>
                            <h1 className="flex justify-center mb-5 font-bold text-5xl italic">Welcome!</h1>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput
                                id="email"
                                name="email"
                                required
                                type="email"
                            // value={props.email}

                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <div className="mb-9">
                                <TextInput
                                    id="password"
                                    type="password"
                                // value={props.value.password}
                                />
                            </div>
                        </div>
                        <Button className="bg-slate-600" type="submit" >
                            Login
                        </Button>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default Login;
