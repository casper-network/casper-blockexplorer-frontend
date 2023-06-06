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
    // TODO: will need to figure out way to confirm urlParams match expected values and types

    console.log({ pageNumParam });
    console.log({ pageSizeParam });
    console.log({ sortByParam });
    console.log({ orderParam });

    // pageNum - number + is part of total page set
    // pageSize - number + is part of 5, 10, 20
    // sortByParam - string + is part of sortable table cols
    // order - string + is one of 'asc' or 'desc'

    const validTableOptions = getValidTableOptionsFromUrlSearchParams({
      pageNumParam,
      pageSizeParam,
      orderParam,
      sortByParam,
      defaultTableOptions: tableOptions,
      validSortByOptions,
    });

    return {
      pagination: {
        pageNum: parseInt(pageNumParam, 10),
        pageSize: parseInt(pageSizeParam, 10),
      },
      sorting: { sortBy: sortByParam, order: orderParam },
    };
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
  orderParam: string;
  sortByParam: string;
  defaultTableOptions: TableOptions;
  validSortByOptions: string[];
}): TableOptions => {
  const validTableOptions = defaultTableOptions;

  const parsedPageNum = parseInt(pageNumParam, 10);
  const parsedPageSize = parseInt(pageSizeParam, 10);

  if (!Number.isNaN(parsedPageNum)) {
    validTableOptions.pagination.pageNum = parsedPageNum;
  }

  // TODO: think about maybe putting these in config/const
  const isPageSizeValidValue = [5, 10, 20].includes(parsedPageSize);

  if (!Number.isNaN(parsedPageSize) && isPageSizeValidValue) {
    validTableOptions.pagination.pageSize = parsedPageSize;
  }

  const isSortByValidOption = validSortByOptions.includes(sortByParam);

  if (isSortByValidOption) {
    validTableOptions.sorting.sortBy = sortByParam;
  }

  return {
    pagination: {
      pageNum: parseInt(pageNumParam, 10),
      pageSize: parseInt(pageSizeParam, 10),
    },
    sorting: { sortBy: sortByParam, order: orderParam as 'desc' | 'asc' },
  };
};
