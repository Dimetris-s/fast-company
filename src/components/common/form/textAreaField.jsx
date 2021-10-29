import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    error,
    rows,
    placeholder
}) => {
    const changeHandler = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return `form-control ${error ? "is-invalid" : ""}`;
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    className={getInputClasses()}
                    onChange={changeHandler}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    rows={rows}
                ></textarea>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default TextAreaField;
