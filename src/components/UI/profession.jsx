import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfessions";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const prof = getProfession(id);
    if (isLoading) return "loading...";
    return <p>{prof.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
