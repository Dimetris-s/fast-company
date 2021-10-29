import React from "react";
import PropTypes from "prop-types";

const RadioFeild = ({ name, options, value, onChange, label }) => {
    const changeHandler = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name} className="d-block form-label">
                {label}
            </label>
            {options.map(option => (
                <div key={option.name} className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        id={option.name + "_" + option.value}
                        value={option.value}
                        checked={value === option.value}
                        onChange={changeHandler}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={option.name + "_" + option.value}
                    >
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

RadioFeild.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    label: PropTypes.string
};

export default RadioFeild;
