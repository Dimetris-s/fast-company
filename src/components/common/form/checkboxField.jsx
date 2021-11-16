import React from "react";
import PropTypes, { node } from "prop-types";

const CheckboxField = ({ name, value, onChange, error, children }) => {
    const changeHandler = () => {
        onChange({ name, value: !value });
    };
    const getInputClasses = () => {
        return `form-check-input ${error ? "is-invalid" : ""}`;
    };
    return (
        <div className="mb-4">
            <div className="form-check">
                <input
                    className={getInputClasses()}
                    type="checkbox"
                    value=""
                    id={name}
                    onChange={changeHandler}
                    checked={value}
                />
                <label className="form-check-label" htmlFor={name}>
                    {children}
                </label>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

CheckboxField.propTypes = {
    name: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(node), PropTypes.node])
};
export default CheckboxField;
