import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import {useState} from "react";
import { useRecoilState } from 'recoil';
import backend from "../components/backend";
import atoms from "../states/backend";

axios.defaults.withCredentials = true;

export default function MarketList() {
    const [marketList, setMarketList] = React.useState([]);
    const [selectedMarket, setSelectedMarket] = React.useState("");
    const [series, setSeries] = useRecoilState(atoms.atomSeries);

    const getMarketList = async () => {
        const response = await backend.getMarketAll();
        const marketList = response?.data.map((item) => (item?.market));
        let KRWMarketList = [];
        let BTCMarketList = [];
        let USDTMarketList = [];
        response?.data.forEach((item) => {
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
        setMarketList(KRWMarketList);
        return marketList;
    };

    const onClickSelectMarket = async (event) => {
        const market = event.target.outerText;
        let response = await backend.getCandlesMinutes(market, 30*7);
        let marketSeries = [{
            name: market,
            data: response.data.map((item) => (item?.trade_price)),
        }];
        setSelectedMarket(market);
        setSeries(marketSeries);
    }

    useState(async () => {
        await getMarketList();
    }, []);

    return (
        <Box sx={{width: 'auto', bgcolor: 'background.paper'}}>
            <List
                component="nav"
                aria-label="secondary mailbox folder"
                sx={{
                    width: '100%',
                    //maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 720,
                    '& ul': { padding: 0 },
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
