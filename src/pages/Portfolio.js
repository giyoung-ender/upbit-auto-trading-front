import ApexCharts from "react-apexcharts";
import * as React from "react";
import {useRecoilState} from "recoil";
import {useState} from "react";
import atoms from "../states/backend";
import backend from "../components/backend";

export const Portfolio = () => {
    const [portfolioChartSeries, setPortfolioChartSeries] = useRecoilState(atoms.atomPortfolioChartSeries);
    const [portfolioChartOptions, setPortfolioChartOptions] = useRecoilState(atoms.atomPortfolioChartOptions);
    const [accessKey, setAccessKey] = useRecoilState(atoms.serverAccessKey);
    const [secretKey, setSecretKey] = useRecoilState(atoms.serverSecretKey);

    useState(async ()=>{
        const allAccounts = await backend.postAllAccounts(accessKey, secretKey);

        const marketSeries = allAccounts.data.map((item) => item.balance);
        const marketLabels = allAccounts.data.map((item) => item.currency);
        const newOptions = {...portfolioChartOptions};
        newOptions['labels'] = marketLabels;
        setPortfolioChartSeries(marketSeries);
        setPortfolioChartOptions(newOptions);
    }, []);

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