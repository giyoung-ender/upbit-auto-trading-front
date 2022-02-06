import {atom} from 'recoil';

export const defaultCandleOptions = {
    plotOptions: {
        candlestick: {
            colors: {
                upward: '#3C90EB',
                downward: '#DF7D46'
            },
            wick: {
                useFillColor: true,
            },
        },
    },
    chart: {
        zoom: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    grid: {
        row: {
            colors: ['#f3f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    tooltip: {
        enabled: true,
    },
};
export const defaultPieOptions = {
    chart: {
        width: 'auto'
    },
    legend: {
        position: 'top' || 'bottom'
    },
    labels: []
};

const atoms = {
    atomOptions: atom({
        key: 'atomOptions', // unique ID (with respect to other atoms/selectors)
        default: defaultCandleOptions, // default value (aka initial value)
    }),
    atomSeries: atom({
        key: 'atomSeries', // unique ID (with respect to other atoms/selectors)
        default: [], // default value (aka initial value)
    }),
    atomPortfolioChartSeries: atom({
        key: 'atomPortfolioChartSeries', // unique ID (with respect to other atoms/selectors)
        default: [], // default value (aka initial value)
    }),
    atomPortfolioChartOptions: atom({
        key: 'atomPortfolioChartOptions', // unique ID (with respect to other atoms/selectors)
        default: defaultPieOptions, // default value (aka initial value)
    }),
    selectedMarketBase: atom({
        key: 'selectedMarketBase', // unique ID (with respect to other atoms/selectors)
        default: 'KRW', // default value (aka initial value)
    }),
    serverAccessKey: atom({
        key: 'serverAccessKey', // unique ID (with respect to other atoms/selectors)
        default: '', // default value (aka initial value)
    }),
    serverSecretKey: atom({
        key: 'serverSecretKey', // unique ID (with respect to other atoms/selectors)
        default: '', // default value (aka initial value)
    }),
};

export default atoms;