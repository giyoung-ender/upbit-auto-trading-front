const axios = require('axios')

export const getTicks = async (market, count) => {
    const url = 'http://opc_ender:3000/quotation/tradesTicks?market=' + market + '&count=' + count;
    const result = await axios({
        method : 'get',
        url
    });
    return result.data;
}
/*
getTicks('KRW-BTC', 10).then((data) => console.log(data.data))
*/
