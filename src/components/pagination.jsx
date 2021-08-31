import React from "react";

const Pagination = ({pages, onToggle, currentPage}) => {
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map(page => <PageItem key={page} onToggle={onToggle} page={page} isActive={currentPage === page} />)}
      </ul>
    </nav>
  );
};

const PageItem = ({page, onToggle, isActive}) => {
  return (
    <li className={`page-item ${isActive ? "active" : ''}`} onClick={(e) => onToggle(e, page)}>
      <a className="page-link" href="/">
        {page + 1}
      </a>
    </li>
  );
};

export default Pagination