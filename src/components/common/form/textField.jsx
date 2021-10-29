import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
    name,
    type,
    label,
    onChange,
    value,
    error,
    placeholder
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };
    const getInputClasses = () => {
        return `form-control ${error ? "is-invalid" : ""}`;
    };
    const changeHandler = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    className={getInputClasses()}
                    onChange={changeHandler}
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                />
                {type === "password" && (
                    <button
                        onClick={toggleShowPassword}
                        className="btn btn-outline-secondary"
                        type="button"
                    >
                        <i
                            className={`bi bi-eye${
                                showPassword ? "-slash" : ""
                            }`}
                        />
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default TextField;
