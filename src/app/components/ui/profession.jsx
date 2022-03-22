import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionLoadingStatus
} from "../../store/profession";

const Profession = ({ id }) => {
    const prof = useSelector(getProfessionById(id));
    const isLoading = useSelector(getProfessionLoadingStatus());
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "loading ...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
