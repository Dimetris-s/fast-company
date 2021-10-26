import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, data, columns, selectedSort, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody data={data} columns={columns} />
                </>
            )}
        </table>
    );
};
Table.propTypes = {
    onSort: PropTypes.func,
    data: PropTypes.array,
    columns: PropTypes.object,
    selectedSort: PropTypes.object,
    children: PropTypes.array
};

export default Table;
