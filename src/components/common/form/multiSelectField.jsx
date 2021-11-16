import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ name, options, label, onChange, value }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => ({
                  label: options[option].name,
                  value: options[option]._id
              }))
            : options;

    const changeHandler = (value) => {
        onChange({ name, value });
    };
    return (
        <div className="mb-4">
            <label className="d-block form-label">{label}</label>
            <Select
                value={value}
                closeMenuOnSelect={false}
                isMulti
                name={name}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={changeHandler}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    name: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default MultiSelectField;
