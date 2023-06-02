import { TableOptions } from './types';

export const setInitialTableState = <T>(
  localStorageKey: string,
  defaultState: T,
  tableOptions: TableOptions,
): T => {
  // TODO: maybe we want to consider trying to get all the keys here dynamically?
  const {
    pagination: { pageNum, pageSize },
    sorting: { order, sortBy },
  } = tableOptions;

  // fetching search params
  const pageNumParam = getUrlSearchParam('pageNum');
  const pageSizeParam = getUrlSearchParam('pageSize');
  const orderParam = getUrlSearchParam('order');
  const sortByParam = getUrlSearchParam('sortBy');

  // fetching LS
  const rawTableOptions = localStorage.getItem(localStorageKey);

  const hasAllTableOptionParams =
    pageNumParam && pageSizeParam && orderParam && sortByParam;

  // 1.
  if (!hasAllTableOptionParams && !rawTableOptions) {
    // TODO: don't need to set LS
    // but should probably set url SP to default
    // could however consider not setting SP here, but nbd

    setTableOptionsUrlSearchParams(tableOptions);

    return defaultState;
  }

  // 2.
  if (!hasAllTableOptionParams && rawTableOptions) {
    const parsedTableOptions = JSON.parse(rawTableOptions) as TableOptions;

    // TODO: set SP to LS value

    setTableOptionsUrlSearchParams(parsedTableOptions);

    return {
      ...defaultState,
      tableOptions: parsedTableOptions,
    };
  }

  // const tableOptions = JSON.parse(rawTableOptions) as TableOptions;

  console.log({ pageNumParam });
  console.log({ pageSizeParam });
  console.log({ orderParam });
  console.log({ sortByParam });

  // TODO: follow notes for priority of setting initial state from LS vs. searchParams

  return defaultState;
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
