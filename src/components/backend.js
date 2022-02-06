const axios = require('axios');

const backendServerIp = process.env.REACT_APP_BACKEND_SERVER_IP;
const backendServerPort = process.env.REACT_APP_BACKEND_SERVER_PORT;

const backend = {
    getTicks: async (market, count) => {
        const url = `http://${backendServerIp}:${backendServerPort}/quotation/tradesTicks?market=${market}&count=${count}`;
        const response = await axios.get(url);
        return response.data;
    },
    getMarketAll: async () => {
        const url = `http://${backendServerIp}:${backendServerPort}/quotation/marketAll`;
        const response = await axios.get(url);
        return response.data;
    },
    getCandlesWeeks: async (market, count) => {
        const url = `http://${backendServerIp}:${backendServerPort}/quotation/candles/weeks?market=${market}&count=${count}`;
        const response = await axios.get(url);
        return response.data;
    },
    getCandlesMinutes: async (market, count, unit = 1) => {
        const url = `http://${backendServerIp}:${backendServerPort}/quotation/candles/minutes/${unit}?market=${market}&count=${count}`;
        const response = await axios.get(url);
        return response.data;
    },
    putServerAccount: async (accessKey, secretKey) => {
        const url = `http://${backendServerIp}:${backendServerPort}/server/account`;
        const data = {
            "access_key": accessKey,
            "secret_key": secretKey
        };
        const response = await axios.put(url, data);
        return response.data;
    },
    getServerAccount: async () => {
        const url = `http://${backendServerIp}:${backendServerPort}/server/account`;
        const response = await axios.get(url);
        return response.data;
    },
    postApiKeys: async (accessKey, secretKey) => {
        const url = `http://${backendServerIp}:${backendServerPort}/exchange/apiKeys`;
        const data = {
            "access_key": accessKey,
            "secret_key": secretKey
        };
        const response = await axios.post(url, data);
        return response.data;
    },
    postAllAccounts: async (accessKey, secretKey) => {
        const url = `http://${backendServerIp}:${backendServerPort}/exchange/allAccounts`;
        const data = {
            "access_key": accessKey,
            "secret_key": secretKey
        };
        const response = await axios.post(url, data);
        return response.data;
    },
};

export default backend;