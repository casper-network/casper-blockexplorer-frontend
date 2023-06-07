import {
  TABLE_OPTIONS_ORDERING_PRESETS,
  TABLE_OPTIONS_PAGE_SIZE_PRESETS,
} from './constants';
import { TableOptions } from './types';

export const determineInitialTableState = (
  localStorageKey: string,
  tableOptions: TableOptions,
  validSortByOptions: string[],
): TableOptions => {
  const pageNumParam = getUrlSearchParam('pageNum');
  const pageSizeParam = getUrlSearchParam('pageSize');
  const orderParam = getUrlSearchParam('order') as
    | TableOptions['sorting']['order']
    | undefined;
  const sortByParam = getUrlSearchParam('sortBy');

  const rawTableOptions = localStorage.getItem(localStorageKey);

  const hasAllTableOptionParams =
    pageNumParam && pageSizeParam && orderParam && sortByParam;

  if (!hasAllTableOptionParams && !rawTableOptions) {
    setTableOptionsUrlSearchParams(tableOptions);

    return tableOptions;
  }

  if (!hasAllTableOptionParams && rawTableOptions) {
    const parsedTableOptions = JSON.parse(rawTableOptions) as TableOptions;

    setTableOptionsUrlSearchParams(parsedTableOptions);

    return parsedTableOptions;
  }

  if (hasAllTableOptionParams) {
    const validTableOptions = getValidTableOptionsFromUrlSearchParams({
      pageNumParam,
      pageSizeParam,
      orderParam,
      sortByParam,
      defaultTableOptions: tableOptions,
      validSortByOptions,
    });

    setTableOptionsUrlSearchParams(validTableOptions);

    return validTableOptions;
  }

  return tableOptions;
};

export const setInitialStateWithLSTableOptions = <T>(
  localStorageKey: string,
  defaultState: T,
) => {
  const rawTableOptions = localStorage.getItem(localStorageKey);

  if (rawTableOptions === null) {
    return defaultState;
  }

  const tableOptions = JSON.parse(rawTableOptions) as TableOptions;

  return {
    ...defaultState,
    tableOptions,
  };
};

export const getUrlSearchParam = (value: string) => {
  if ('URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search);

    const param = searchParams.get(value);

    return param;
  }
};

export const setUrlSearchParams = (key: string, value: string | number) => {
  if ('URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, typeof value === 'number' ? value.toString() : value);

    const newRelativePathQuery = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, '', newRelativePathQuery);
  }
};

export const setTableOptionsUrlSearchParams = (tableOptions: TableOptions) => {
  const {
    pagination: { pageNum, pageSize },
    sorting: { order, sortBy },
  } = tableOptions;

  setUrlSearchParams('pageNum', pageNum);
  setUrlSearchParams('pageSize', pageSize);
  setUrlSearchParams('order', order);
  setUrlSearchParams('sortBy', sortBy);
};

export const getValidTableOptionsFromUrlSearchParams = ({
  pageNumParam,
  pageSizeParam,
  orderParam,
  sortByParam,
  defaultTableOptions,
  validSortByOptions,
}: {
  pageNumParam: string;
  pageSizeParam: string;
  orderParam: 'desc' | 'asc';
  sortByParam: string;
  defaultTableOptions: TableOptions;
  validSortByOptions: string[];
}): TableOptions => {
  let validTableOptions = defaultTableOptions;

  const parsedPageNum = parseInt(pageNumParam, 10);

  if (!Number.isNaN(parsedPageNum)) {
    validTableOptions = {
      ...validTableOptions,
      pagination: { ...validTableOptions.pagination, pageNum: parsedPageNum },
    };
  }

  const parsedPageSize = parseInt(pageSizeParam, 10);
  const isPageSizeValidValue =
    TABLE_OPTIONS_PAGE_SIZE_PRESETS.includes(parsedPageSize);

  if (!Number.isNaN(parsedPageSize) && isPageSizeValidValue) {
    validTableOptions = {
      ...validTableOptions,
      pagination: {
        ...validTableOptions.pagination,
        pageSize: parsedPageSize,
      },
    };
  }

  const isSortByValidOption = validSortByOptions.includes(sortByParam);

  if (isSortByValidOption) {
    validTableOptions = {
      ...validTableOptions,
      sorting: {
        ...validTableOptions.sorting,
        sortBy: sortByParam,
      },
    };
  }

  const isOrderValidOption =
    TABLE_OPTIONS_ORDERING_PRESETS.includes(orderParam);

  if (isOrderValidOption) {
    validTableOptions = {
      ...validTableOptions,
      sorting: {
        ...validTableOptions.sorting,
        order: orderParam,
      },
    };
  }

  return validTableOptions;
};
