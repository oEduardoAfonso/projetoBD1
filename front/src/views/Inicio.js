import * as React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    conteudo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    },
}))


export default function Inicio() {
    const history = useHistory()
    const classes = useStyles()

    React.useEffect(() => {
        localStorage.removeItem('perfil')
    }, [])

    function navigateToLogin() {
        history.push('/login')
    }

    function navigateToCadastro() {
        history.push('/cadastro')
    }

    return <Box className={classes.conteudo}>
        <Stack spacing={2} direction="column">
            <Button variant="contained" onClick={navigateToLogin}>LOGIN</Button>
            <Button variant="outlined" onClick={navigateToCadastro}>CADASTRO</Button>
        </Stack>
    </Box>
}