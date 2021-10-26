import * as React from 'react';
import { useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/styles';
import api from "../services/Api";


const useStyles = makeStyles((theme) => ({
    conteudo: {
        display: 'flex',
        justifySelf: 'center',
    },
}))

export default function Base(props) {
    const { children } = props;
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [pesquisa, setPesquisa] = React.useState();
    const classes = useStyles()
    const isMenuOpen = Boolean(anchorEl);
    const [perfil, setPerfil] = React.useState(null);

    React.useEffect(() => {
        api.get('/perfis/' + localStorage.getItem('perfil'), {}).then(response => { setPerfil(response.data) })
    }, [])

    const ariaLabel = { 'aria-label': 'description' };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function navigateToPerfil() {
        handleMenuClose()
        history.push(`/perfil/${perfil.usuario}`)
    }

    function navigateToBegin() {
        history.push('/')
    }


    function navigateToHomepage() {
        history.push('/home')
    }

    function navigateToBusca() {
        history.push(`/busca/${pesquisa}`)
    }

    const handlePesquisa = (event) => {
        setPesquisa(event.target.value)
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={navigateToPerfil}>Perfil</MenuItem>
            <MenuItem onClick={navigateToBegin}>Sair</MenuItem>
        </Menu>
    );


    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} onClick={navigateToHomepage}>
                        Facekut
                    </Typography>
                    <Box sx={{ width: '40%', mr: 55 }}>
                        <Input onChange={handlePesquisa} placeholder="Busque por amigos..." id="pesquisa" inputProps={ariaLabel} sx={{ width: '80%', borderBottom: 1 }} />
                        <IconButton onClick={navigateToBusca} color="inherit">
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    {renderMenu}
                </Toolbar>
            </AppBar>
            <Box sx={{
                width: '100%',
                mt: 2.5,
                mb: 2.5,
                display: 'flex',
                justifyContent: 'center'
            }} className={classes.conteudo}>
                <Grid conteiner sx={{
                    width: 800,
                    minHeight: 850,
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'primary.dark'
                }}>
                    {children}
                </Grid>
            </Box >
        </Box >
    );
}
