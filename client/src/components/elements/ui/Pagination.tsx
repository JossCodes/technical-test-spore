import { useState, useCallback, useEffect } from "react";

import { Pagination } from "react-bootstrap";
import { PaginationComponentProps } from "src/interfaces/pagination";

export const PaginationComponent = ({
  totalPages,
  onChange,
}: PaginationComponentProps) => {
  const [activePage, setActivePage] = useState(0);
  const [paginationItems, setPaginationItems] = useState<JSX.Element[]>([]);

  const handleChangePage = useCallback(
    (page: number) => {
      setActivePage(page);
      onChange(page);
    },
    [onChange]
  );

  useEffect(() => {
    const allItems = [];

    for (let i = 0; i < totalPages; i++) {
      allItems.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => {
            if (i !== activePage) handleChangePage(i);
          }}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    setPaginationItems(allItems);
  }, [activePage, totalPages, handleChangePage]);

  return (
    <>
      {totalPages > 0 && (
        <div className="d-flex justify-content-end mt-3">
          <Pagination>
            <Pagination.Prev
              disabled={activePage === 0 ? true : false}
              onClick={() => handleChangePage(activePage - 1)}
            />
            {paginationItems}
            <Pagination.Next
              disabled={activePage === totalPages - 1 ? true : false}
              onClick={() => handleChangePage(activePage + 1)}
            />
          </Pagination>
        </div>
      )}
    </>
  );
};
