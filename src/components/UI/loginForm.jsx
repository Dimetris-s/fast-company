import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import CheckboxField from "../common/form/checkboxField";
import TextField from "../common/form/textField";

const LoginForm = () => {
    const config = {
        email: {
            isRequired: { message: "Email не может быть пустым" },
            isEmail: { message: "Email введен некорректно" }
        },
        password: {
            isRequired: {
                message: "Password не может быть пустым"
            },
            isCapital: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isDigit: { message: "Пароль должен содержать минимум одну цифру" },
            min: {
                message: "Длина пароля должна состоять минимум из 8 символов",
                value: 8
            }
        }
    };
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = ({ name, value }) => {
        setData(prevState => ({ ...prevState, [name]: value }));
    };
    const validate = () => {
        const errors = validator(data, config);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const submitHandler = event => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={submitHandler}>
            <TextField
                name={"email"}
                onChange={handleChange}
                label={"Электронная почта:"}
                value={data.email}
                error={errors.email}
            />
            <TextField
                name={"password"}
                onChange={handleChange}
                label={"Пароль:"}
                value={data.password}
                error={errors.password}
                type="password"
            />
            <CheckboxField
                name="stayOn"
                onChange={handleChange}
                value={data.stayOn}
            >
                Оставаться в системе
            </CheckboxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValid}
                type="submit"
            >
                submit
            </button>
        </form>
    );
};

export default LoginForm;
