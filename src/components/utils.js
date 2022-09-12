const utils = {
    toKRW: (number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number);
    },
    toUSDT: (number) => {
        return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(number);
    },
    toBTC: (number) => {
        return number;
    },
};

export default utils;