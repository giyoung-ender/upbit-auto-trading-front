import {TextField, Box, Button} from "@mui/material";
import * as React from "react";
import {useRecoilState} from "recoil";
import atoms from "../states/backend";
import backend from "../components/backend";
import {useEffect} from "react";

export const Setting = () => {
    const [accessKey, setAccessKey] = useRecoilState(atoms.serverAccessKey);
    const [secretKey, setSecretKey] = useRecoilState(atoms.serverSecretKey);

    useEffect(()=>{
        backend.getServerAccount().then(({access_key, secret_key}) =>{
            setAccessKey(access_key);
            setSecretKey(secret_key);
        });
    }, [accessKey, secretKey, setAccessKey, setSecretKey]);

    const accessKeyInputOnChange = (event) => {
        setAccessKey(event.target.value);
    };

    const secretKeyInputOnChange = (event) => {
        setSecretKey(event.target.value);
    };

    const onApplyClick = async (event) => {
        await backend.putServerAccount(accessKey, secretKey);
    };

    return (
        <div>
            <p>
                Setting
            </p>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="accessKey" variant="outlined" value={accessKey} onChange={accessKeyInputOnChange}/>
                <TextField id="outlined-basic" label="secretKey" variant="outlined" value={secretKey} onChange={secretKeyInputOnChange}/>
                <Button variant="outlined"  onClick={onApplyClick}>Apply</Button>
            </Box>
        </div>
    );
}
export default Setting;