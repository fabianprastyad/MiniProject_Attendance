import { TextInput, Button, Label } from "flowbite-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Registration() {
    const token = localStorage.getItem("token");

    const formattedDate = (date) => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    const [birthDate, setBirthDate] = useState(new Date());
    const [joinDate, setJoinDate] = useState(new Date());

    const handleSubmit = (values) => {
        if (window.confirm("Do you want to continue?")) {
            const data = {
                ...values,
                birth_date: formattedDate(birthDate),
                join_date: formattedDate(joinDate),
            };

            axios
                .post("http://localhost:8000/employee/registration", data, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log(response);
                    alert(response.data.message);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.response.data.message);
                });
        }
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required("First Name is required"),
        last_name: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        salary: Yup.number().required("Salary is required"),
    });

    return (
        <div className="flex justify-center item-center py-24">
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    salary: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-4 w-96 px-7 py-24 border bg-slate-300 justify-center">
                    <h1 className="flex justify-center mb-5 font-bold text-2xl italic">Sign Up Sheet</h1>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="first_name" value="First Name" />
                        </div>
                        <Field
                            as={TextInput}
                            id="first_name"
                            name="first_name"
                            type="text"
                        />
                        <ErrorMessage name="first_name" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="last_name" value="Last Name" />
                        </div>
                        <Field
                            as={TextInput}
                            id="last_name"
                            name="last_name"
                            type="text"
                        />
                        <ErrorMessage name="last_name" component="div" className="text-red-500" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <Field
                            as={TextInput}
                            id="email"
                            name="email"
                            type="email"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    <div className="mb-2 block">
                        <Label htmlFor="birth_date" value="Your Birth Date" />
                    </div>
                    <DatePicker
                        showIcon
                        id="birth_date"
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                    />
                    <div className="flex flex-col">
                        <div className="mb-2 block">
                            <Label htmlFor="join_date" value="Join Date" />
                        </div>
                        <DatePicker
                            showIcon
                            id="join_date"
                            selected={joinDate}
                            onChange={(date) => setJoinDate(date)}
                        />
                    </div>
                    <div className="mb-2 block">
                        <Label htmlFor="salary" value="Salary" />
                    </div>
                    <TextInput
                        className="mb-10"
                        id="salary"
                        name="salary"
                        placeholder="IDR"
                    />
                    <Button className="bg-slate-600" type="submit">Sign Up</Button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
