import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ usersCount }) => {
    const renderPhrase = number => {
        switch (true) {
            case number === 0:
                return "Никто с тобой не тусанет";
            case number > 1 && number < 5:
                return `${number} человека тусанут с тобой сегодня`;
            default:
                return `${number} человек тусанет с тобой сегодня`;
        }
    };

    return (
        <h2
            className={`fs-3 mt-1 ms-1 badge bg-${
                usersCount ? "primary" : "danger"
            }`}
        >
            {renderPhrase(usersCount)}
        </h2>
    );
};

SearchStatus.propTypes = {
    usersCount: PropTypes.number.isRequired
};

export default SearchStatus;
