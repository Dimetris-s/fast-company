import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort, columns }) => {
    const sortHandler = item => {
        if (item === selectedSort.path) {
            onSort(selectedSort => ({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            }));
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th
                        key={column}
                        role={columns[column].path && "button"}
                        onClick={
                            columns[column].path
                                ? () => sortHandler(columns[column].path)
                                : undefined
                        }
                        scope="col"
                    >
                        {columns[column].name}
                        {selectedSort.path === columns[column].path && (
                            <i
                                className={`bi bi-caret-${
                                    selectedSort.order === "asc" ? "up" : "down"
                                }-fill`}
                            />
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
