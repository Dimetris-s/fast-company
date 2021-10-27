import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import API from "../../API";
import SelectField from "../common/form/selectField";
import RadioFeild from "../common/form/radioField";

const RegisterForm = () => {
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
        },
        profession: {
            isRequired: {
                message: "Необходимо выбрать профессию"
            }
        }
    };
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male"
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    useEffect(() => {
        API.professions.fetchAll().then(data => setProfessions(data));
    }, []);
    useEffect(() => {
        console.log(professions);
    }, [professions]);
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = event => {
        const { name, value } = event.target;
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
            <SelectField
                name="profession"
                onChange={handleChange}
                label="Выберите профессию"
                value={data.profession}
                error={errors.profession}
                defaultOption="Choose..."
                options={professions}
            />
            <RadioFeild
                name="sex"
                label="Выберите пол"
                value={data.sex}
                onChange={handleChange}
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
            />
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

export default RegisterForm;
