import * as React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import api from "../services/Api";

const useStyles = makeStyles((theme) => ({
    conteudo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    },
}))


export default function Cadastro() {
    const history = useHistory()
    const classes = useStyles()
    const [values, setValues] = React.useState({
        password: '',
        usuario: '',
        nome: '',
        showPassword: false,
    });

    function navigateToHomepage() {
        history.push('/')
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = event => {
        event.preventDefault();
        const perfil = {
            usuario: values.usuario,
            nome: values.nome,
            senha: values.password
        }

        api.post('/perfis', perfil)
        navigateToHomepage()
    }

    return <Box className={classes.conteudo} component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
        <Stack spacing={2} direction="column">
            <TextField id="usuario" value={values.usuario} onChange={handleChange('usuario')} label="USUARIO" variant="outlined" />
            <TextField id="nome" value={values.nome} onChange={handleChange('nome')} label="NOME" variant="outlined" />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">SENHA</InputLabel>
                <OutlinedInput
                    id="senha"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Senha"
                />
            </FormControl>
            <Button variant="contained" onClick={handleSubmit} type='submit'>CONCLUIR</Button>
            <Button color='error' variant="outlined" onClick={navigateToHomepage}>CANCELAR</Button>
        </Stack>
    </Box>
}