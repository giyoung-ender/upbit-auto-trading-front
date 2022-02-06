import ApexCharts from 'react-apexcharts'
import MarketList from "./MarketList";
import atoms from "../states/backend";
import * as React from 'react';
import {useRecoilState} from 'recoil';
import {useState} from "react";
import backend from "../components/backend";
import {FormControl, InputLabel, MenuItem, Select, Box, Grid} from "@mui/material";

export const Dashboard = () => {
    const [series, setSeries] = useRecoilState(atoms.atomSeries);
    const [options, setOptions] = useRecoilState(atoms.atomOptions);
    const [selectedMarketBase, setSelectedMarketBase] = useRecoilState(atoms.selectedMarketBase);

    useState(() => {
        backend.getCandlesMinutes('KRW-BTC', 30 * 7).then((response) => {
            const marketSeries = [
                {
                    name: 'KRW-BTC',
                    data: response.data.map((item) => ({
                        x: new Date(item?.timestamp),
                        y: [
                            item?.opening_price,
                            item?.high_price,
                            item?.low_price,
                            item?.trade_price,
                        ]
                    })),
                }
            ];
            const newOptions = {...options};
            newOptions['title'] = {
                text: 'KRW-BTC : ' + response.data[response.data.length - 1]?.trade_price,
                align: 'left'
            };
            setOptions(newOptions);
            setSeries(marketSeries);
        });
    }, [selectedMarketBase]);

    const Chart = () => {
        return (<ApexCharts
            options={options}
            series={series}
            type='candlestick'
            width='100%'
            height='auto'
        />);
    };

    const ChartMenu = () => {
        return (
            <Box sx={{minWidth: 120}}>
                <FormControl sx={{width: '50%'}}>
                    <InputLabel id="demo-simple-select-label">market</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedMarketBase}
                        label="market"
                    >
                        <MenuItem value={'KRW'} onClick={() => setSelectedMarketBase('KRW')}>KRW</MenuItem>
                        <MenuItem value={'BTC'} onClick={() => setSelectedMarketBase('BTC')}>BTC</MenuItem>
                        <MenuItem value={'USDT'} onClick={() => setSelectedMarketBase('USDT')}>USDT</MenuItem>
                    </Select>
                </FormControl>
            </Box>);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    <ChartMenu/>
                    <Chart/>
                </Grid>
                <Grid item xs={2}>
                    <MarketList/>
                </Grid>
            </Grid>
        </Box>
    );
}
export default Dashboard;
