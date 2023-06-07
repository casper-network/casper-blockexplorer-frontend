import { TableOptions } from './types';

export const determineInitialTableState = (
  localStorageKey: string,
  tableOptions: TableOptions,
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

    return {
      pagination: {
        pageNum: parseInt(pageNumParam, 10),
        pageSize: Number(pageSizeParam),
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
