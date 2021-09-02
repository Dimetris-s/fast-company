export const paginate = (items, pageNumber, itemsPerPage) => {
    return items.slice(
        (pageNumber - 1) * itemsPerPage,
        (pageNumber - 1) * itemsPerPage + itemsPerPage
    );
};
