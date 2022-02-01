import { atom } from 'recoil';

export const defaultOptions = {
    chart: {
        zoom: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: false
    },
    /*stroke: {
        curve: 'straight'
    },*/
    /*title: {
        text: '',
        align: 'left'
    },*/
    grid: {
        row: {
            colors: ['#f3f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    /*xaxis: {
        /!*categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],*!/
        categories: [],
    }*/
};


const atoms = {
    atomOptions: atom({
        key: 'atomOptions', // unique ID (with respect to other atoms/selectors)
        default: defaultOptions, // default value (aka initial value)
    }),
    atomSeries: atom({
        key: 'atomSeries', // unique ID (with respect to other atoms/selectors)
        default: [], // default value (aka initial value)
    }),
};

export default atoms;