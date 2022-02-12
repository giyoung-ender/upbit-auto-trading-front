import React, {useState, useEffect} from "react";
import {
    AppBar,
    IconButton,
    Box,
    Toolbar,
    Typography,
    Container,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

const pages = ['Dashboard', 'Portfolio', 'Setting'];

const Header = () => {
    const [state, setState] = useState({
        mobileView: false,
    });
    const {mobileView} = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({...prevState, mobileView: true}))
                : setState((prevState) => ({...prevState, mobileView: false}));
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        }
    }, []);

    const handleDrawerOpen = () => {
        console.log("handleDrawerOpen open");
    };

    const MobileHeader = () => {
        return (<Toolbar disableGutters>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                {"Upbit Auto Trading"}
            </Toolbar>
        );
    }

    const DesktopHeader = () => {
        return (<Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                >
                    Upbit Auto Trading
                </Typography>
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {pages.map((page, key) => (
                        <Link to={"/" + page} key={key}>
                            <Button
                                value={page}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        </Link>
                    ))}
                </Box>
            </Toolbar>
        );
    }

    return (
        <AppBar position="static" sx={{marginBottom: 2}}>
            <Container maxWidth="xl">
                {mobileView ? <MobileHeader/> : <DesktopHeader/>}
            </Container>
        </AppBar>
    );
};
export default Header;
