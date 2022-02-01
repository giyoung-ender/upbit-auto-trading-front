import ApexCharts from 'react-apexcharts'
import MarketList from "./MarketList";
import atoms from "../states/backend";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {useRecoilState} from 'recoil';
import {useState} from "react";
import backend from "../components/backend";

export const Dashboard = () => {
    const [series, setSeries] = useRecoilState(atoms.atomSeries);
    const [options, setOptions] = useRecoilState(atoms.atomOptions);

    useState(()=>{
        backend.getCandlesMinutes('KRW-BTC', 30*7).then((response) => {
            let marketSeries = [{
                name: 'KRW-BTC',
                data: response.data.map((item) => (item?.trade_price)),
            }];
            setSeries(marketSeries);
        });
    }, []);

    const Chart = () => {
        return (<ApexCharts
            options={options}
            series={series}
            typs='line'
            width='100%'
            height='auto'
        />);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    <Chart/>
                    {/*<ApexCharts
                        options={options}
                        series={series}
                        typs='line'
                        width='100%'
                        height='auto'
                    />*/}
                </Grid>
                <Grid item xs={2}>
                    <MarketList/>
                </Grid>
            </Grid>
        </Box>
    );
}
export default Dashboard;
