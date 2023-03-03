export const standardizePercentage = (num: number, decimals?: number) =>
  `${num.toLocaleString('en', {
    useGrouping: false,
    minimumFractionDigits: decimals ?? 2,
  })}%`;
