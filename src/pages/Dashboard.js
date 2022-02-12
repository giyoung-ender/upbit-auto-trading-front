import ApexCharts from 'react-apexcharts'
import MarketList from "./MarketList";
import atoms from "../states/backend";
import * as React from 'react';
import {useRecoilState} from 'recoil';
import {useState} from "react";
import backend from "../components/backend";
import {FormControl, InputLabel, MenuItem, Select, Box, Grid} from "@mui/material";
import utils from '../components/utils';

export const Dashboard = () => {
    const [series, setSeries] = useRecoilState(atoms.atomSeries);
    const [options, setOptions] = useRecoilState(atoms.atomOptions);
    const [seriesBar, setSeriesBar] = useRecoilState(atoms.atomSeriesBar);
    const [optionsBar, setOptionsBar] = useRecoilState(atoms.atomOptionsBar);
    const [selectedMarketBase, setSelectedMarketBase] = useRecoilState(atoms.selectedMarketBase);

    useState(() => {
        backend.getCandlesMinutes('KRW-BTC', 30 * 7).then((response) => {
            const marketSeries = [
                {
                    name: 'KRW-BTC',
                    data: response.data.map((item) => ({
                        x: new Date(new Date(item?.timestamp).getTime() - (new Date(item?.timestamp).getTimezoneOffset() * 60000 ))
                            .toISOString()
                            .split("T")[1]
                            .split('.')[0],
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
                text: 'KRW-BTC : ' + utils.toKRW(response.data[response.data.length - 1]?.trade_price),
                align: 'left'
            };
            setOptions(newOptions);
            setSeries(marketSeries);
            setSeriesBar([
                {
                    name: 'KRW-BTC',
                    data: response.data.map((item) => ({
                        x: new Date(new Date(item?.timestamp).getTime() - (new Date(item?.timestamp).getTimezoneOffset() * 60000 ))
                            .toISOString()
                            .split("T")[1]
                            .split('.')[0],
                        y: item?.candle_acc_trade_price
                    })),
                }
            ]);
        });
        backend.getServerAccount().then(({access_key, secret_key}) => {
            backend.postOrderChance(access_key, secret_key, 'KRW-BTC').then(result => console.log(result));
        });
    }, []);

    const Chart = () => {
        return (
            <Box>
                <ApexCharts
                    id={'mainChart'}
                    options={options}
                    series={series}
                    type='candlestick'
                    width='100%'
                    height='auto'
                />
                <ApexCharts
                    options={optionsBar}
                    series={seriesBar}
                    type="bar"
                    width='100%'
                    height='30%'
                />
            </Box>
        );
    };

    const ChartMenu = () => {
        return (
            <Box sx={{minWidth: '100%'}}>
                <FormControl sx={{width: '100%'}}>
                    <InputLabel>market</InputLabel>
                    <Select
                        value={selectedMarketBase}
                        label="market"
                    >
                        <MenuItem
                            value={'KRW'}
                            onClick={() => setSelectedMarketBase('KRW')}>
                            KRW
                        </MenuItem>
                        <MenuItem
                            value={'BTC'}
                            onClick={() => setSelectedMarketBase('BTC')}>
                            BTC
                        </MenuItem>
                        <MenuItem
                            value={'USDT'}
                            onClick={() => setSelectedMarketBase('USDT')}>
                            USDT
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1}>
                <Grid item xs={10} sx={{paddingLeft: 2}}>
                    <Chart/>
                </Grid>
                <Grid item xs={2} sx={{paddingRight: 2}}>
                    <ChartMenu/>
                    <MarketList/>
                </Grid>
            </Grid>
        </Box>
    );
}
export default Dashboard;
