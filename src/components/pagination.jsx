import React from "react";
// import PropTypes from "prop-types";

const Pagination = ({
    itemsCount,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const pagesCount = Math.ceil(itemsCount / itemsPerPage);

    if (pagesCount === 1) return null;

    const pages = new Array(pagesCount).fill(0).map((_, i) => i + 1);

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => {
                            onPageChange(currentPage - 1);
                        }}
                        className="page-link">
                        Prev
                    </button>
                </li>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${
                            currentPage === page ? "active" : ""
                        }`}>
                        <a
                            style={{ cursor: "pointer" }}
                            className="page-link"
                            onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <button
                        disabled={currentPage === pages.length}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="page-link">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
