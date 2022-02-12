const utils = {
    toKRW: (number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number);
    },
};

export default utils;