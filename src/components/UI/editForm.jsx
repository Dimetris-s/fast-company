import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import API from "../../API";
import RadioFeild from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router";

const EditForm = ({ user }) => {
    const history = useHistory();
    const userQualities = user.qualities.map((quality) => ({
        value: quality._id,
        label: quality.name
    }));

    const config = {
        name: {
            isRequired: {
                message: "Имя не должно быть пустым"
            }
        },
        email: {
            isRequired: {
                message: "Email не должен быть пустым"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: { message: "Выберите профессию" }
        }
    };
    const [data, setData] = useState({
        name: user.name,
        email: user.email || "",
        profession: user.profession._id || "",
        sex: user.sex || "male",
        qualities: userQualities
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [allQualities, setAllQualities] = useState();
    const qualitiesArray =
        allQualities &&
        Object.keys(allQualities).map((qualName) => ({
            _id: allQualities[qualName]._id,
            name: allQualities[qualName].name,
            color: allQualities[qualName].color
        }));
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
        API.qualities.fetchAll().then((data) => setAllQualities(data));
    }, []);
    useEffect(() => {
        const errors = validator(data, config);
        setErrors(errors);
    }, [data]);
    const submitHandler = (event) => {
        event.preventDefault();
        const newUser = {
            ...data,
            profession:
                professions[
                    Object.keys(professions).find(
                        (professionName) =>
                            professions[professionName]._id === data.profession
                    )
                ],
            qualities: data.qualities.map((dataQuality) =>
                qualitiesArray.find(
                    (quality) => quality._id === dataQuality.value
                )
            )
        };
        API.users
            .update(user._id, newUser)
            .then(() => history.push(`/users/${user._id}`));
    };
    const handleChange = ({ name, value }) => {
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const isInvalid = Object.keys(errors).length > 0;
    return (
        <form onSubmit={submitHandler}>
            <TextField
                value={data.name}
                name="name"
                onChange={handleChange}
                error={errors.name}
                label="Имя"
            />
            <TextField
                value={data.email}
                name="email"
                onChange={handleChange}
                error={errors.email}
                label="Email"
            />
            <SelectField
                name="profession"
                options={professions}
                defaultOption="Профессии"
                error={errors.profession}
                onChange={handleChange}
                label="Выбери свою профессию"
                value={data.profession}
            />
            <RadioFeild
                name="sex"
                label="Выбери свой пол"
                value={data.sex}
                onChange={handleChange}
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
            />
            <MultiSelectField
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
                options={allQualities}
                value={data.qualities}
            />
            <button disabled={isInvalid} className="btn btn-primary w-100">
                Обновить
            </button>
        </form>
    );
};

EditForm.propTypes = {
    user: PropTypes.object
};

export default EditForm;
