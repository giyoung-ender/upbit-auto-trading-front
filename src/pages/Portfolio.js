import ApexCharts from "react-apexcharts";
import * as React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {useState} from "react";
import atoms from "../states/backend";
import backend from "../components/backend";

export const Portfolio = () => {
    const [portfolioChartSeries, setPortfolioChartSeries] = useRecoilState(atoms.atomPortfolioChartSeries);
    const [portfolioChartOptions, setPortfolioChartOptions] = useRecoilState(atoms.atomPortfolioChartOptions);
    const [orders, setOrders] = useState([]);
    const accessKey = useRecoilValue(atoms.serverAccessKey);
    const secretKey = useRecoilValue(atoms.serverSecretKey);

    useState(async ()=>{
        const allAccounts = await backend.postAllAccounts(accessKey, secretKey);
        if (allAccounts.data?.error) return;
        const marketSeries = allAccounts?.data?.map((item) =>
            item.currency === 'KRW' ?
                parseFloat(item.balance) :
                item.balance * parseFloat(item.avg_buy_price)
        );
        const marketLabels = allAccounts?.data?.map((item) => item.currency);
        const newOptions = {...portfolioChartOptions};
        newOptions['labels'] = marketLabels;
        setPortfolioChartSeries(marketSeries);
        setPortfolioChartOptions(newOptions);

        const tmp_orders = await backend.postOrders(accessKey, secretKey);
        console.log(tmp_orders);

    }, [accessKey, secretKey]);

    const PortfolioChart = () => {
        return (<ApexCharts
            options={portfolioChartOptions}
            series={portfolioChartSeries}
            type='pie'
            width='100%'
            height='auto'
        />);
    };

    return (
        <div>
            <p>
                Portfolio
            </p>
            <PortfolioChart/>
        </div>
    );
}
export default Portfolio;