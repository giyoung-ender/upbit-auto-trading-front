import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import backend from "../components/backend";
import atoms from "../states/backend";
import utils from "../components/utils";

axios.defaults.withCredentials = true;

export default function MarketList() {
    const [marketList, setMarketList] = React.useState([]);
    const [selectedMarket, setSelectedMarket] = React.useState("");
    const setSeries = useSetRecoilState(atoms.atomSeries);
    const selectedMarketBase = useRecoilValue(atoms.selectedMarketBase);
    const [options, setOptions] = useRecoilState(atoms.atomOptions);
    const [seriesBar, setSeriesBar] = useRecoilState(atoms.atomSeriesBar);

    useEffect(() => {
        getMarketList().then(r => {});
    }, []);

    const getMarketList = async () => {
        const response = await backend.getMarketAll();
        const marketList = response?.data.map((item) => (item?.market));
        let KRWMarketList = [];
        let BTCMarketList = [];
        let USDTMarketList = [];
        response?.data.forEach((item) => {
            // eslint-disable-next-line default-case
            switch (item?.market.split('-')[0]) {
                case 'KRW':
                    KRWMarketList.push(item?.market);
                    break;
                case 'BTC':
                    BTCMarketList.push(item?.market);
                    break;
                case 'USDT':
                    USDTMarketList.push(item?.market);
                    break;
            }
        });
        const event = {target: {outerText: {}}};
        // eslint-disable-next-line default-case
        switch (selectedMarketBase) {
            case 'KRW':
                setMarketList(KRWMarketList);
                event['target']['outerText'] = KRWMarketList[0];
                break;
            case 'BTC':
                setMarketList(BTCMarketList);
                event['target']['outerText'] = BTCMarketList[0];
                break;
            case 'USDT':
                setMarketList(USDTMarketList);
                event['target']['outerText'] = USDTMarketList[0];
                break;
        }
        await onClickSelectMarket(event);
        return marketList;
    };

    const onClickSelectMarket = async (event) => {
        const market = event.target.outerText;
        const response = await backend.getCandlesMinutes(market, 30 * 7);
        const marketSeries = [
            {
                name: market,
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
            text: market + ' : ' + utils.toKRW(response.data[response.data.length - 1]?.trade_price),
            align: 'left'
        };
        setOptions(newOptions);
        setSelectedMarket(market);
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
    }

    return (
        <Box sx={{width: 'auto', bgcolor: 'background.paper'}}>
            <List
                component="nav"
                aria-label="secondary mailbox folder"
                sx={{
                    marginTop: 2,
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    height: 720,
                    '& ul': {padding: 0},
                }}
            >
                {marketList.map((market, key) => (
                    <ListItemButton key={key} onClick={onClickSelectMarket}>
                        <ListItemText primary={market}/>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}
