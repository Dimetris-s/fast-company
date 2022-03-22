import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualityLoadingStatus,
    loadQualities
} from "../../../store/quality";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualityLoadingStatus());
    const qualitiesArray = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualities());
    }, []);
    if (isLoading) return "Loadind..";
    return (
        <>
            {qualitiesArray.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
