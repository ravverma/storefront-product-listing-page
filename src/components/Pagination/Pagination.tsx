/*
Copyright 2024 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

import { useProducts } from '../../context';
import { ELLIPSIS, usePagination } from '../../hooks/usePagination';
import Chevron from '../../icons/chevron.svg';

interface PaginationProps {
  onPageChange: (page: number | string) => void;
  totalPages: number;
  currentPage: number;
}

export const Pagination: FunctionComponent<PaginationProps> = ({
  onPageChange,
  totalPages,
  currentPage,
}) => {
  const productsCtx = useProducts();
  const paginationRange = usePagination({
    currentPage,
    totalPages,
  });

  useEffect(() => {
    const { currentPage, totalPages } = productsCtx;
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }

    return () => {};
  }, []);
  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="ds-plp-pagination flex justify-center items-center mt-2 mb-6 list-none">
      <Chevron
        className={`h-sm w-sm transform rotate-90 ${
          currentPage === 1
            ? 'stroke-neutral-600 cursor-not-allowed'
            : 'stroke-brand-700 cursor-pointer'
        }`}
        onClick={onPrevious}
      />

      {paginationRange?.map((page: number | string) => {
        if (page === ELLIPSIS) {
          return (
            <li
              key={page}
              className="ds-plp-pagination__dots text-brand-300 mx-sm my-auto"
            >
              ...
            </li>
          );
        }

        return (
          <li
            key={page}
            className={`ds-plp-pagination__item flex items-center cursor-pointer text-center font-body-2-default text-brand-700 my-auto mx-sm ${
              currentPage === page
                ? 'ds-plp-pagination__item--current text-brand-700 font-body-1-strong underline underline-offset-4 decoration-brand-700'
                : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        );
      })}

      <Chevron
        className={`h-sm w-sm transform -rotate-90 ${
          currentPage === totalPages
            ? 'stroke-neutral-600 cursor-not-allowed'
            : 'stroke-brand-700 cursor-pointer'
        }`}
        onClick={onNext}
      />
    </ul>
  );
};

export default Pagination;
